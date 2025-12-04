"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEmail } from "@/hooks/use-email";
import { ArrowLeft, Calendar, Clock, Check } from "lucide-react";

const eventTypes = [
  "Wedding",
  "Baby Shower",
  "Birthday Celebration",
  "Corporate Event",
  "Anniversary",
  "Social Gathering",
  "Other",
];

export default function BookingPage() {
  const { toast } = useToast();
  const { sendAppointment, isLoading } = useEmail();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    venue: "",
    details: "",
    howHeard: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.eventType) {
      newErrors.eventType = "Please select an event type";
    }

    if (formData.eventDate) {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.eventDate = "Event date cannot be in the past";
      }
    }

    if (formData.guestCount) {
      const count = parseInt(formData.guestCount, 10);
      if (isNaN(count) || count <= 0) {
        newErrors.guestCount = "Guest count must be a positive number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.details.trim()) {
      newErrors.details = "Please share details about your event";
    } else if (formData.details.trim().length < 20) {
      newErrors.details = "Please provide more details (at least 20 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const response = await sendAppointment(formData);
      
      if (response.success) {
        toast({
          title: "Consultation Request Submitted",
          description:
            "Thank you! We'll review your request and contact you within 24-48 hours.",
        });
        setStep(4);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to submit your request. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStep1Continue = () => {
    if (validateStep1()) {
      setStep(2);
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before continuing.",
        variant: "destructive",
      });
    }
  };

  const handleStep2Continue = () => {
    if (validateStep2()) {
      setStep(3);
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before continuing.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back to Home</span>
            </Link>
            <Link
              href="/"
              className="font-serif text-2xl tracking-wide text-foreground"
            >
              Kerith & Co.
            </Link>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
              <p className="text-sm tracking-[0.3em] uppercase text-gold mb-4">
                Begin Your Journey
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                Book a Consultation
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Share your vision with us and let's explore how we can bring
                your dream event to life.
              </p>
            </div>

            {/* Progress Steps */}
            {step < 4 && (
              <div className="flex items-center justify-center gap-4 mb-12">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center border-2 transition-all ${
                        step >= s
                          ? "border-gold bg-gold text-background"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {step > s ? <Check size={16} /> : s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`w-16 h-px ${
                          step > s ? "bg-gold" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Form */}
            <div className="bg-card border border-border p-8 md:p-12">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-serif text-2xl text-foreground mb-6">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="booking-first-name" className="text-sm text-muted-foreground mb-2 block">
                        First Name *
                      </label>
                      <Input
                        id="booking-first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={(e) => updateForm("firstName", e.target.value)}
                        required
                        className="bg-transparent border-border focus:border-gold"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "booking-first-name-error" : undefined}
                      />
                      {errors.firstName && (
                        <p id="booking-first-name-error" className="text-sm text-destructive mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="booking-last-name" className="text-sm text-muted-foreground mb-2 block">
                        Last Name *
                      </label>
                      <Input
                        id="booking-last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={(e) => updateForm("lastName", e.target.value)}
                        required
                        className="bg-transparent border-border focus:border-gold"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "booking-last-name-error" : undefined}
                      />
                      {errors.lastName && (
                        <p id="booking-last-name-error" className="text-sm text-destructive mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-email" className="text-sm text-muted-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      id="booking-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      required
                      className="bg-transparent border-border focus:border-gold"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "booking-email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="booking-email-error" className="text-sm text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className="text-sm text-muted-foreground mb-2 block">
                      Phone Number
                    </label>
                    <Input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      className="bg-transparent border-border focus:border-gold"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "booking-phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="booking-phone-error" className="text-sm text-destructive mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="luxury"
                    size="lg"
                    className="w-full mt-4"
                    onClick={handleStep1Continue}
                    disabled={!formData.firstName || !formData.lastName || !formData.email}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="font-serif text-2xl text-foreground mb-6">
                    Event Details
                  </h2>
                  <div>
                    <label className="text-sm text-muted-foreground mb-3 block">
                      Event Type *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {eventTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateForm("eventType", type)}
                          className={`p-3 border text-sm transition-all ${
                            formData.eventType === type
                              ? "border-gold bg-gold/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-gold/50"
                          }`}
                          aria-pressed={formData.eventType === type}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {errors.eventType && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.eventType}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="booking-event-date" className="text-sm text-muted-foreground mb-2 block">
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Preferred Event Date
                      </label>
                      <Input
                        id="booking-event-date"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => updateForm("eventDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-transparent border-border focus:border-gold"
                        aria-invalid={!!errors.eventDate}
                        aria-describedby={errors.eventDate ? "booking-event-date-error" : undefined}
                      />
                      {errors.eventDate && (
                        <p id="booking-event-date-error" className="text-sm text-destructive mt-1">
                          {errors.eventDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="booking-guest-count" className="text-sm text-muted-foreground mb-2 block">
                        Estimated Guest Count
                      </label>
                      <Input
                        id="booking-guest-count"
                        name="guestCount"
                        type="number"
                        min="1"
                        value={formData.guestCount}
                        onChange={(e) => updateForm("guestCount", e.target.value)}
                        placeholder="e.g., 100"
                        className="bg-transparent border-border focus:border-gold"
                        aria-invalid={!!errors.guestCount}
                        aria-describedby={errors.guestCount ? "booking-guest-count-error" : undefined}
                      />
                      {errors.guestCount && (
                        <p id="booking-guest-count-error" className="text-sm text-destructive mt-1">
                          {errors.guestCount}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="booking-budget" className="text-sm text-muted-foreground mb-2 block">
                      Budget Range
                    </label>
                    <select
                      id="booking-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => updateForm("budget", e.target.value)}
                      className="w-full h-10 px-3 border border-border bg-transparent text-foreground focus:border-gold focus:outline-none"
                    >
                      <option value="">Select a range</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000-50000">$25,000 - $50,000</option>
                      <option value="50000-100000">$50,000 - $100,000</option>
                      <option value="100000+">$100,000+</option>
                    </select>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button
                      variant="luxury-outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="luxury"
                      size="lg"
                      className="flex-1"
                      onClick={handleStep2Continue}
                      disabled={!formData.eventType}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                  <h2 className="font-serif text-2xl text-foreground mb-6">
                    Tell Us More
                  </h2>
                  <div>
                    <label htmlFor="booking-venue" className="text-sm text-muted-foreground mb-2 block">
                      Do you have a venue in mind?
                    </label>
                    <Input
                      id="booking-venue"
                      name="venue"
                      type="text"
                      value={formData.venue}
                      onChange={(e) => updateForm("venue", e.target.value)}
                      placeholder="Venue name or 'Still searching'"
                      className="bg-transparent border-border focus:border-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-details" className="text-sm text-muted-foreground mb-2 block">
                      Share your vision and any specific details *
                    </label>
                    <Textarea
                      id="booking-details"
                      name="details"
                      value={formData.details}
                      onChange={(e) => updateForm("details", e.target.value)}
                      required
                      rows={5}
                      placeholder="Tell us about your dream event, theme ideas, must-haves, etc."
                      className="bg-transparent border-border focus:border-gold resize-none"
                      aria-invalid={!!errors.details}
                      aria-describedby={errors.details ? "booking-details-error" : undefined}
                    />
                    {errors.details && (
                      <p id="booking-details-error" className="text-sm text-destructive mt-1">
                        {errors.details}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="booking-how-heard" className="text-sm text-muted-foreground mb-2 block">
                      How did you hear about us?
                    </label>
                    <select
                      id="booking-how-heard"
                      name="howHeard"
                      value={formData.howHeard}
                      onChange={(e) => updateForm("howHeard", e.target.value)}
                      className="w-full h-10 px-3 border border-border bg-transparent text-foreground focus:border-gold focus:outline-none"
                    >
                      <option value="">Select an option</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="google">Google Search</option>
                      <option value="referral">Friend/Family Referral</option>
                      <option value="vendor">Vendor Referral</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Button
                      type="button"
                      variant="luxury-outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="flex-1"
                      disabled={!formData.details || isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              )}

              {step === 4 && (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gold/10 text-gold rounded-full">
                    <Check size={40} />
                  </div>
                  <h2 className="font-serif text-3xl text-foreground mb-4">
                    Thank You!
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Your consultation request has been received. Our team will
                    review your submission and contact you within 24-48 business hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="luxury" asChild>
                      <Link href="/">Return Home</Link>
                    </Button>
                    <Button variant="luxury-outline" asChild>
                      <a href="/#services">Explore Services</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Alternative */}
            {step < 4 && (
              <div className="text-center mt-12">
                <p className="text-muted-foreground">
                  Prefer to speak directly?{" "}
                  <a
                    href="tel:+1234567890"
                    className="text-gold hover:underline"
                  >
                    Call us at (123) 456-7890
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

