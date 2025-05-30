'use client';

import { useEffect, useState } from 'react';
import { AgendaIcons, AgendaList } from './data';

const getTimeRemaining = (targetDate: string) => {
  const total = Date.parse(targetDate) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

const pad = (n: number) => String(n).padStart(2, '0');

export const AgendaSection = () => {
  const targetDate = '2025-07-18T13:00:00';
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeRemaining(targetDate);
      setTimeLeft(updated);
      if (updated.total <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      id="agenda"
      className="flex flex-col justify-between gap-6 bg-[url(/images/bg-agenda.jpg)] bg-cover bg-no-repeat px-4 py-10 text-[14px] text-white sm:h-[887px] sm:flex-row sm:gap-12 sm:px-32"
    >
      <div className="bg-primary/71 flex flex-col gap-8 rounded-[28px] px-4 py-6 pr-2">
        <div className="flex max-w-[516px] flex-col items-center gap-[21px]">
          <h2 className="section-heading text-center">Agenda</h2>
          <p className="text-center text-[16px]">
            Venez partager avec nous ces moments spéciaux
          </p>
        </div>
        <div className="grid grid-cols-2 flex-wrap gap-x-4 gap-y-8">
          {AgendaList.map((agenda) => (
            <div key={agenda.title} className="flex flex-col gap-3">
              {agenda.icon}
              <h3 className="text-[16px]">{agenda.title}</h3>
              <div className="flex gap-3">
                {AgendaIcons.calendar}
                <span>{agenda.date}</span>
              </div>
              <div className="flex gap-3">
                {AgendaIcons.watch}
                <span>{agenda.time}</span>
              </div>
              <div className="flex gap-3">
                <span className="w-4">{AgendaIcons.location}</span>
                <span>{agenda.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div className="bg-primary/71 flex items-center justify-center gap-8 rounded-[28px] p-6">
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
    </div>
  );
};
