import { CalendarCheck, MapPin, Ticket, Utensils } from "lucide-react";

import Card from "../components/Card";
import { events } from "../data/mockData";

function Events({ onNotify }) {
  return (
    <div className="screen-stack">
      <div className="screen-heading">
        <span className="badge">Eventos para assistir</span>
        <h2>Transmissões, bares e finais locais.</h2>
        <p>Reserve presença, acompanhe lotação e combine com a comunidade.</p>
      </div>

      {events.map((event) => (
        <Card className="event-card" glow key={event.id}>
          <div className="card-row">
            <div>
              <span className="badge">{event.type}</span>
              <h3>{event.title}</h3>
            </div>
            <Ticket size={24} />
          </div>
          <div className="meta-grid">
            <span>
              <MapPin size={14} />
              {event.place}
            </span>
            <span>
              <CalendarCheck size={14} />
              {event.time}
            </span>
            <span>
              <Utensils size={14} />
              {event.vibe}
            </span>
            <span>Lotação {event.capacity}</span>
          </div>
          <button
            className="wide-button"
            onClick={() => onNotify?.("🎟 Presença confirmada")}
            type="button"
          >
            Reservar Presença
          </button>
        </Card>
      ))}
    </div>
  );
}

export default Events;
