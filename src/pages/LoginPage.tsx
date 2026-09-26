import {
    LockPasswordIcon,
    MailAtSign02Icon,
    AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { IAccountLogin } from "@/types/account/IAccountLogin";
import { useLoginMutation } from "@/services/apiAccount";
import type { ApiError } from "@/types/api/ApiError";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAppDispatch } from "@/store/hooks";
import {
    logout,
    setAccessToken,
    setRefreshToken,
} from "@/store/slices/authSlice";

const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

const getTokenRoles = (token: string): string[] => {
    try {
        const payload = token.split(".")[1];
        const claims = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        const roles = claims.roles ?? claims.role ?? claims[ROLE_CLAIM] ?? [];

        return Array.isArray(roles) ? roles : [roles];
    } catch {
        return [];
    }
};

const LoginPage = () => {
    const [login, { isLoading: isLogining }] = useLoginMutation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [loginError, setLoginError] = useState<string | null>(null);

    const { register, handleSubmit } = useForm<IAccountLogin>();
    const [hide, setHide] = useState<boolean>(true)

    useEffect(() => {
        const set = () => {
            if (location.state?.from == "/auth/register") {
                setTimeout(() => {
                    setHide(false);
                }, 200)
            } else {
                setHide(false);
            }
        }

        set();
    }, [])

    const onSubmit = async (data: IAccountLogin) => {
        try {
            setLoginError(null);

            const tokens = await login(data).unwrap();
            const roles = getTokenRoles(tokens.accessToken);
            const hasAdminRole = roles.some(
                (role) => role === "Owner" || role === "Admin"
            );

            if (!hasAdminRole) {
                dispatch(logout());
                setLoginError("У вас немає повноважень для входу");
                return;
            }

            dispatch(setAccessToken(tokens.accessToken));
            dispatch(setRefreshToken(tokens.refreshToken));
            navigate("/", { replace: true });
        } catch (error: any) {
            const errors = error?.data?.errors;

            console.error(errors);

            if (!Array.isArray(errors)) {
                setLoginError("Невірна пошта або пароль");
                return;
            }

            errors.forEach((err: ApiError) => {
                if (err.field === "LoginError") {
                    setLoginError("Невірна пошта або пароль");
                }
            });
        }
    };

    return (
        <motion.form
            className={`flex w-full max-w-md flex-col items-center gap-5 ${hide ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className="text-4xl font-bold tracking-tight text-[#17212b]">
                Login
            </h1>

            <div className="flex w-full flex-col gap-4">
                {loginError && (
                    <motion.p
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 flex items-center gap-2 rounded-xl border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-500"
                    >
                        <HugeiconsIcon
                            icon={AlertCircleIcon}
                            size={17}
                        />

                        {loginError}
                    </motion.p>
                )}

                {/* Email */}
                <InputGroup className="h-14 rounded-xl bg-[#f3f4f5]">
                    <InputGroupAddon className="pl-4 text-[#707982]">
                        <HugeiconsIcon
                            icon={MailAtSign02Icon}
                            size={20}
                        />
                    </InputGroupAddon>

                    <InputGroupInput
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        className="px-3 text-base"
                        {...register("email")}
                        required
                    />
                </InputGroup>

                {/* Password */}
                <InputGroup className="h-14 rounded-xl bg-[#f3f4f5]">
                    <InputGroupAddon className="pl-4 text-[#707982]">
                        <HugeiconsIcon
                            icon={LockPasswordIcon}
                            size={20}
                        />
                    </InputGroupAddon>

                    <InputGroupInput
                        type="password"
                        placeholder="Password"
                        aria-label="Password"
                        className="px-3 text-base"
                        {...register("password")}
                        required
                    />
                </InputGroup>
            </div>

            <Button
                type="submit"
                size="lg"
                className="mt-2 h-14 w-full rounded-full bg-[#fece18] text-lg font-semibold text-[#17212b] hover:bg-[#f4bb00]"
                disabled={isLogining}
            >
                {isLogining ? (
                    <Spinner className="size-5" />
                ) : (
                    "Login"
                )}
            </Button>
        </motion.form>
    );
};

export default LoginPage;