import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PageHero from '@/components/marketing/PageHero';

const contacts = [
  { icon: Mail, label: 'Email', value: 'hello@projtrack.com' },
  { icon: Phone, label: 'Phone', value: '+91 80 4567 8900' },
  { icon: MapPin, label: 'HQ', value: 'Bengaluru, India' },
  { icon: MessageSquare, label: 'Support', value: 'support@projtrack.com' },
];

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's <span className="text-gradient">talk</span></>}
        description="Sales, support, partnerships — we usually reply within one business day."
      />

      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-5 lg:px-6">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-3 lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-12 w-12 text-success" />
                <h3 className="mt-4 font-display text-2xl font-bold text-foreground">Message sent</h3>
                <p className="mt-2 text-sm text-muted-foreground">Our team will reply to you within 1 business day.</p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>Send another</Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <h2 className="font-display text-xl font-bold text-card-foreground">Send us a message</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="org">Institution</Label>
                  <Input id="org" />
                </div>
                <div>
                  <Label htmlFor="msg">How can we help?</Label>
                  <Textarea id="msg" rows={5} required />
                </div>
                <Button type="submit" size="lg" className="gradient-primary border-0 gap-2">
                  Send message <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
              <h2 className="font-display text-xl font-bold text-card-foreground">Get in touch</h2>
              <p className="mt-2 text-sm text-muted-foreground">Prefer to reach us directly? Use any of the channels below.</p>
              <ul className="mt-6 space-y-4">
                {contacts.map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                      <p className="text-sm text-foreground">{c.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <p className="font-display text-base font-semibold">Looking for support?</p>
              <p className="mt-1 text-sm text-muted-foreground">Check our help center for instant answers to common questions.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
