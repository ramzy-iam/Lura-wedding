'use client';

import { useEffect, useState } from 'react';
import { AgendaIcons, AgendaList } from './data';

// Retourne le prochain samedi à 08h00
const getNextSaturdayAt8AM = () => {
  const now = new Date();
  const target = new Date(now);

  const day = now.getDay(); // 0 = dimanche, 6 = samedi
  const daysUntilSaturday = (6 - day + 7) % 7; // nb de jours jusqu'à samedi

  target.setDate(now.getDate() + daysUntilSaturday);
  target.setHours(8, 0, 0, 0);

  // Si on est samedi et il est déjà passé 08h
  if (day === 6 && now >= target) {
    target.setDate(target.getDate() + 7);
  }

  return target;
};

const getTimeRemaining = (target: Date) => {
  const total = target.getTime() - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

const pad = (n: number) => String(n).padStart(2, '0');

export const AgendaSection = () => {
  const [targetDate, setTargetDate] = useState(getNextSaturdayAt8AM());
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeRemaining(targetDate);
      if (updated.total <= 0) {
        const newTarget = getNextSaturdayAt8AM();
        setTargetDate(newTarget);
        setTimeLeft(getTimeRemaining(newTarget));
      } else {
        setTimeLeft(updated);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section
      id="agenda"
      className="flex flex-col justify-between gap-6 bg-[url(/images/bg-agenda.jpg)] bg-cover bg-no-repeat px-4 py-10 text-white md:items-center lg:h-[887px] lg:justify-center lg:gap-12 2xl:px-32 2xl:py-[100px]"
    >
      <div className="bg-primary/71 flex w-full flex-col items-center gap-8 rounded-[28px] px-4 py-6 pr-2 lg:p-12">
        <div className="flex max-w-[516px] flex-col items-center gap-[21px]">
          <h2 className="section-heading text-center">Agenda</h2>
          <p className="text-center">
            Venez partager avec nous ces moments spéciaux
          </p>
        </div>
        <div className="grid w-full grid-cols-2 flex-wrap items-center gap-x-4 gap-y-8 md:gap-y-4 lg:grid-cols-4">
          {AgendaList.map((agenda) => (
            <div
              key={agenda.title}
              className="flex h-full flex-col gap-3 lg:col-span-1"
            >
              {agenda.icon}
              <h3 className="font-medium">{agenda.title}</h3>
              <div className="flex items-center gap-3">
                {AgendaIcons.calendar}
                <span>{agenda.date}</span>
              </div>
              <div className="flex items-center gap-3">
                {AgendaIcons.watch}
                <span>{agenda.time}</span>
              </div>
              <a
                href={agenda.url}
                className="flex items-center gap-3"
                target="_blank"
                rel="noreferrer"
              >
                <span className="w-4">{AgendaIcons.location}</span>
                <span>{agenda.location}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-primary/71 flex max-w-[616px] items-center justify-center gap-8 rounded-[28px] p-6">
        <div className="grid grid-cols-11">
          <div className="col-span-2 flex flex-col items-center gap-3">
            <span>{pad(timeLeft.days)}</span>
            <span>Jours</span>
          </div>
          <span className="col-span-1 text-center">:</span>
          <div className="col-span-2 flex flex-col items-center gap-3">
            <span>{pad(timeLeft.hours)}</span>
            <span>Heures</span>
          </div>
          <span className="col-span-1 text-center">:</span>
          <div className="col-span-2 flex flex-col items-center gap-3">
            <span>{pad(timeLeft.minutes)}</span>
            <span>Minutes</span>
          </div>
          <span className="col-span-1 text-center">:</span>
          <div className="col-span-2 flex flex-col items-center gap-3">
            <span>{pad(timeLeft.seconds)}</span>
            <span>Secondes</span>
          </div>
        </div>
      </div>
    </section>
  );
};
