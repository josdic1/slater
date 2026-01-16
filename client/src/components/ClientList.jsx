import { ClientCard } from './ClientCard.jsx';

export function ClientList({clients, users}) {
  
 const clientListData = clients?.map((client) => (
    <ClientCard 
        key={client.id} 
        client={client} 
        users={users} 
    />
))

  return (
    <div className="client-list">
        {clientListData}
    </div>
  );
}