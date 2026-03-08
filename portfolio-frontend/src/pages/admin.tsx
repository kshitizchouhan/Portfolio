import { useEffect, useState } from "react";

interface Message {
  name: string;
  email: string;
  message: string;
}

export default function Admin() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Contact Messages</h1>

      {messages.map((msg, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h3>{msg.name}</h3>
          <p>{msg.email}</p>
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}