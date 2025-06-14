
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import type { Membership } from "@/types/types";

type Props = {
  open: boolean;
  onClose: () => void;
  membership: Membership | null;
  onRegister: (values: RegistrationFormValues) => void;
};

export type RegistrationFormValues = {
  name: string;
  email: string;
  phone: string;
};

const MembershipRegistrationModal = ({
  open,
  onClose,
  membership,
  onRegister
}: Props) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegistrationFormValues>();

  React.useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = (data: RegistrationFormValues) => {
    onRegister(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Register for {membership?.name}
          </DialogTitle>
          <DialogDescription>
            Enter your details and we’ll contact you soon. Payment & upgrade will be handled after verification.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 font-medium" htmlFor="reg-name">Name</label>
            <Input id="reg-name" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="reg-email">Email</label>
            <Input id="reg-email" type="email" {...register("email", {
              required: "Email is required",
              pattern: { value: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/, message: "Invalid email" }
            })}/>
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="reg-phone">Phone</label>
            <Input id="reg-phone" {...register("phone", { required: "Phone is required" })} />
            {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : `Register for ${membership?.name?.split(" ")[0] || "Membership"}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipRegistrationModal;
