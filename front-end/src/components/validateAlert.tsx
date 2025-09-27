import { useState, useEffect } from 'react';

type propsType = { 
  msg: string;
};

// Composant d'alerte de succès
export function SuccessAlert({ msg }: propsType) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed z-50 top-4 right-4
        bg-gradient-to-r from-emerald-500 to-green-500
        min-w-80 px-5 py-4
        rounded-2xl border border-emerald-400
        shadow-xl shadow-emerald-200/50
        flex items-center gap-3
        transition-all duration-300 ease-in-out
        ${isExiting 
          ? 'opacity-0 transform translate-x-full scale-95' 
          : 'opacity-100 transform translate-x-0 scale-100'
        }
        hover:shadow-2xl hover:scale-[1.02]
      `}
    >
      {/* Icône de succès */}
      <div className="flex-shrink-0 text-white">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>

      {/* Message */}
      <div className="flex-1 text-white text-lg font-medium">
        {msg}
      </div>

      {/* Emoji */}
      <div className="text-2xl">
        ✅
      </div>

      {/* Bouton de fermeture */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/20 
                   transition-colors duration-200 text-white
                   focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-b-2xl overflow-hidden w-full">
        <div 
          className="h-full bg-white/60 rounded-b-2xl"
          style={{ 
            animation: 'progressBar 5s linear forwards',
            transformOrigin: 'left'
          }}
        />
      </div>

      {/* Styles CSS intégrés */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `
      }} />
    </div>
  );
}

// Composant d'alerte d'erreur
export function EchecAlert({ msg }: propsType) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed z-50 top-4 right-4
        bg-gradient-to-r from-red-500 to-rose-500
        min-w-80 px-5 py-4
        rounded-2xl border border-red-400
        shadow-xl shadow-red-200/50
        flex items-center gap-3
        transition-all duration-300 ease-in-out
        ${isExiting 
          ? 'opacity-0 transform translate-x-full scale-95' 
          : 'opacity-100 transform translate-x-0 scale-100'
        }
        hover:shadow-2xl hover:scale-[1.02]
      `}
    >
      {/* Icône d'erreur */}
      <div className="flex-shrink-0 text-white">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>

      {/* Message */}
      <div className="flex-1 text-white text-lg font-medium">
        {msg}
      </div>

      {/* Bouton de fermeture */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/20 
                   transition-colors duration-200 text-white
                   focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-b-2xl overflow-hidden w-full">
        <div 
          className="h-full bg-white/60 rounded-b-2xl"
          style={{ 
            animation: 'progressBar 5s linear forwards',
            transformOrigin: 'left'
          }}
        />
      </div>
    </div>
  );
}

// Démo des composants
export default function Demo() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Composants d'Alerte Professionnels
          </h1>
          <p className="text-gray-600">
            Deux composants séparés avec design moderne
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Tester les alertes</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => setShowSuccess(true)}
              className="w-full px-6 py-3 bg-emerald-500 text-white font-medium 
                         rounded-xl hover:bg-emerald-600 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Afficher Alerte de Succès
            </button>
            
            <button
              onClick={() => setShowError(true)}
              className="w-full px-6 py-3 bg-red-500 text-white font-medium 
                         rounded-xl hover:bg-red-600 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Afficher Alerte d'Erreur
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Caractéristiques :</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Design moderne avec dégradés</li>
            <li>✅ Animations fluides d'entrée/sortie</li>
            <li>✅ Fermeture automatique en 5 secondes</li>
            <li>✅ Bouton de fermeture manuel</li>
            <li>✅ Barre de progression visuelle</li>
            <li>✅ Icônes contextuelles</li>
            <li>✅ Effets hover élégants</li>
            <li>✅ Interface type originale préservée</li>
          </ul>
        </div>
      </div>

      {/* Rendu conditionnel des alertes */}
      {showSuccess && (
        <SuccessAlert msg="Opération réalisée avec succès !" />
      )}
      
      {showError && (
        <EchecAlert msg="Une erreur est survenue lors du traitement" />
      )}
    </div>
  );
}