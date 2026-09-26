import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { useApproveRequestMutation } from "@/services/apiCompany";
import type { IRequestCompany } from "@/types/company/IRequestCompany";
import { Check, ClipboardCheck, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type CompanyRequestReviewDialogProps = {
    request: IRequestCompany;
};

type ReviewFormValues = {
    message: string;
};

const CompanyRequestReviewDialog = ({ request }: CompanyRequestReviewDialogProps) => {
    const [approveRequest, { isLoading }] = useApproveRequestMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { register, handleSubmit, reset } = useForm<ReviewFormValues>({
        defaultValues: { message: "" },
    });

    const submitDecision = (isApprove: boolean) => handleSubmit(async ({ message }) => {
        setSubmitError(null);

        try {
            await approveRequest({
                requestId: request.id,
                isApprove,
                message: message.trim() || undefined,
            }).unwrap();

            reset();
            setIsOpen(false);
        } catch {
            setSubmitError("Не вдалося зберегти рішення. Спробуйте ще раз.");
        }
    })();

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setSubmitError(null);
            reset();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(event) => event.stopPropagation()}
                    />
                }
            >
                <ClipboardCheck />
                Розглянути
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Заявка: {request.name}</DialogTitle>
                    <DialogDescription>
                        Перегляньте опис компанії та залиште коментар до рішення.
                    </DialogDescription>
                </DialogHeader>

                <section className="max-h-48 overflow-y-auto rounded-lg border border-border bg-muted/40 p-4">
                    <h3 className="mb-2 text-sm font-semibold">Опис компанії</h3>
                    <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                        {request.description || "Опис не вказано."}
                    </p>
                </section>

                <form onSubmit={(event) => event.preventDefault()} className="space-y-2">
                    <label htmlFor={`request-message-${request.id}`} className="text-sm font-medium">
                        Коментар
                    </label>
                    <Textarea
                        id={`request-message-${request.id}`}
                        placeholder="Напишіть коментар для компанії..."
                        rows={4}
                        disabled={isLoading}
                        {...register("message")}
                    />
                </form>

                {submitError && (
                    <p role="alert" className="text-sm text-destructive">
                        {submitError}
                    </p>
                )}

                <DialogFooter className="sm:flex-row sm:justify-between">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => void submitDecision(false)}
                        disabled={isLoading}
                        aria-label="Відхилити заявку"
                    >
                        {isLoading ? <Spinner /> : <X />}
                        Відхилити
                    </Button>
                    <Button
                        type="button"
                        onClick={() => void submitDecision(true)}
                        disabled={isLoading}
                        aria-label="Схвалити заявку"
                    >
                        {isLoading ? <Spinner /> : <Check />}
                        Схвалити
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CompanyRequestReviewDialog;