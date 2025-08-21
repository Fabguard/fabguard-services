
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePartnerRegistration } from "@/hooks/usePartnerRegistration";

interface PartnerRegistrationFormProps {
  open: boolean;
  onClose: () => void;
}

const PartnerRegistrationForm: React.FC<PartnerRegistrationFormProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    skills: "",
    experience: "",
    message: ""
  });
  const { registerPartner, isLoading } = usePartnerRegistration();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await registerPartner(form);
    
    if (success) {
      setForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        skills: "",
        experience: "",
        message: ""
      });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Partner Registration</DialogTitle>
          <DialogDescription>
            Fill in your details to become a Fabguard service partner.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input type="text" name="name" required placeholder="Full Name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <Input type="text" name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <Input type="email" name="email" placeholder="Email (optional)" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <Input type="text" name="city" required placeholder="City" value={form.city} onChange={handleChange} />
          </div>
          <div>
            <Input type="text" name="skills" required placeholder="Skills/Service Offered" value={form.skills} onChange={handleChange} />
          </div>
          <div>
            <Input type="text" name="experience" placeholder="Experience (e.g. 2 years)" value={form.experience} onChange={handleChange} />
          </div>
          <div>
            <textarea className="w-full border rounded px-3 py-2 text-sm" name="message" placeholder="Additional Info (optional)" value={form.message} rows={2} onChange={handleChange}></textarea>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>{isLoading ? "Submitting..." : "Submit"}</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerRegistrationForm;
