'use client'

import React, { useState } from "react"

const DonationCard: React.FC = () => {
    const [copied, setCopied] = useState(false);
    
    const handleCopyToClipboard = async () => {
      const pixKey = '00020101021126580014br.gov.bcb.pix01368eac1054-b957-4af2-88c7-046b743ece015204000053039865802BR5925allcom comercio e servico6009SAO PAULO622905251J87ZBFMDTY970D6AP39DEHSC6304FDFB'
      try {
        await navigator.clipboard.writeText(pixKey)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Falha ao copiar a chave PIX', e)
      }
    }
    
    return (
      <section id="doacao" className="mb-8">
        <div className="bg-[#FEFCF8] p-6 rounded-xl shadow-sm ring-1 ring-[#A0958A]/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <i className="fas fa-heart text-[#CD853F]"></i>
              <h3 className="text-center text-xl font-bold text-[#4A3F35]">Faça sua Doação</h3>
            </div>
            <p className="text-center text-[#6B5B4F] mb-6 max-w-md mx-auto">
              Contamos com financiamento coletivo e patrocínios para manter o Historin.com. Apoie o Historin e nos ajude a cobrir os custos mensais da plataforma.
            </p>
            <div className="flex flex-col items-center gap-2">
              <button
                className="inline-flex items-center justify-center gap-2 bg-[#8B4513] text-white font-medium py-2.5 px-6 rounded-lg hover:bg-[#A0522D] transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={handleCopyToClipboard}
                aria-label="Copiar chave Pix"
              >
                <i className={copied ? "fas fa-check" : "fas fa-copy"}></i>
                <span>{copied ? "Copiado!" : "Copiar Chave Pix"}</span>
              </button>
              {copied && (
                <span className="text-sm text-[#6B8E23] font-medium animate-fade-in">
                  Chave Pix copiada com sucesso!
                </span>
              )}
            </div>
        </div>
      </section>
    )
}

export default DonationCard