import { useEffect, useState } from 'react';
import { fetchContacts, Contact } from '@/lib/api';

export const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error('Failed to load contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  if (loading) {
    return (
      <div className="container-retro p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Contacts</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-secondary border border-primary animate-pulse">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-muted"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted mb-1"></div>
                <div className="h-3 bg-muted w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-retro p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-primary mb-4">Contacts</h3>
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <a
            key={contact.type}
            href={contact.link}
            target={contact.type === 'Email' || contact.type === 'Phone' ? '_self' : '_blank'}
            rel={contact.type === 'Email' || contact.type === 'Phone' ? '' : 'noopener noreferrer'}
            className="flex items-center gap-3 p-3 bg-secondary border border-primary hover:bg-accent transition-colors duration-150 block"
            style={{ 
              boxShadow: '1px 1px 0px hsl(var(--pixel-shadow))',
              animationDelay: `${index * 150}ms`
            }}
          >
            <div className="text-lg md:text-xl">{contact.icon}</div>
            <div className="flex-1">
              <div className="font-semibold text-primary text-sm">
                {contact.type}
              </div>
              <div className="text-xs text-foreground">
                {contact.value}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};