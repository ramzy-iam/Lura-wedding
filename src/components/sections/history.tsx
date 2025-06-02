'use client';
import { useState, useRef, useEffect } from 'react';

export const HistorySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => setIsModalOpen(true);
  const closeDialog = () => {
    setIsModalOpen(false);
    openButtonRef.current?.focus();
  };

  // Effets pour l'accessibilité et le comportement
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDialog();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeDialog();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Bloque le scroll

      // Focus sur le premier élément focusable du modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = ''; // Rétablit le scroll
    };
  }, [isModalOpen]);

  // Trap le focus dans le modal quand il est ouvert
  useEffect(() => {
    const handleTabKey = (event: KeyboardEvent) => {
      if (!isModalOpen) return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isModalOpen]);

  return (
    <>
      {/* Section Histoire */}
      <div
        id="history"
        className="flex flex-col justify-between gap-6 px-4 sm:flex-row sm:gap-[108px] sm:px-32"
      >
        <div className="flex flex-col gap-6 sm:w-[533px] sm:pr-32">
          <div className="flex h-[59px] items-center gap-6 sm:h-auto">
            <h2 className="section-heading text-primary">Notre Histoire</h2>
            <img
              src="/images/flower.png"
              alt="Décoration florale"
              className="h-full md:hidden"
            />
          </div>

          <p>
            {`Tout a commencé un jour ...Nous pensions que c'était un hasard... et
            pourtant, Dieu avait tout orchestré. Une rencontre marquée par une
            connexion immédiate, par un sourire, une discussion sans fin,... et
            maintenant, nous voici prêts à nous engager pour la vie! `}
            <button
              ref={openButtonRef}
              onClick={openDialog}
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
              className="text-primary cursor-pointer rounded-lg transition-colors duration-200"
            >
              Voir plus...
            </button>
          </p>

          <img
            src="/images/flower.png"
            alt="Décoration florale"
            className="hidden h-auto w-full sm:inline"
          />
        </div>

        <div>
          <img
            src="/images/history.png"
            alt="illustrant notre histoire"
            className="w-full overflow-clip sm:w-[616px]"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={closeDialog}
          />

          <div
            ref={modalRef}
            className="relative z-10 flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl"
            style={{
              maxHeight: '90vh',
            }}
          >
            <h2
              id="modal-title"
              className="text-primary sticky top-0 z-20 rounded-t-2xl bg-white px-6 py-4 text-2xl font-bold"
            >
              Notre Histoire
            </h2>

            <div className="flex-grow overflow-y-auto p-6 pt-0 text-gray-700">
              <p>
                Il était une fois une rencontre imprévue, un simple regard, un
                éclat de rire partagé. Ce jour-là, sans le savoir, deux âmes se
                sont reconnues. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Magni eveniet expedita illum. Harum
                reprehenderit dolorum praesentium consequatur minus blanditiis
                pariatur qui nobis maiores neque atque illum numquam, at
                veritatis minima.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                similique incidunt culpa beatae quos dicta odio officia natus,
                ab, illo optio asperiores ducimus. Doloremque alias incidunt
                quia provident officia placeat.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                similique incidunt culpa beatae quos dicta odio officia natus,
                ab, illo optio asperiores ducimus. Doloremque alias incidunt
                quia provident officia placeat.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                similique incidunt culpa beatae quos dicta odio officia natus,
                ab, illo optio asperiores ducimus. Doloremque alias incidunt
                quia provident officia placeat.
              </p>
            </div>

            <div className="sticky bottom-0 rounded-b-2xl bg-white p-4">
              <button
                onClick={closeDialog}
                className="hover:bg-opacity-80 w-full cursor-pointer rounded-lg bg-[#8A1049] px-4 py-3 text-white transition-colors duration-200"
                aria-label="Fermer la fenêtre modale"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
