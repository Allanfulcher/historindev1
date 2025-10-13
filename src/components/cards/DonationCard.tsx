'use client'

import React from "react"

const DonationCard: React.FC = () => {
    const handleCopyToClipboard = async () => {
      const pixKey = '00020101021126580014br.gov.bcb.pix01368eac1054-b957-4af2-88c7-046b743ece015204000053039865802BR5925allcom comercio e servico6009SAO PAULO622905251J87ZBFMDTY970D6AP39DEHSC6304FDFB'
      try {
        await navigator.clipboard.writeText(pixKey)
        alert('Chave Pix copiada!')
      } catch (e) {
        console.error('Falha ao copiar a chave PIX', e)
        alert('Não foi possível copiar. Copie manualmente: ' + pixKey)
      }
    }
    return (
      <section id="doacao" className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-center text-xl font-bold mb-4">Faça sua Doação</h3>
            <p className="text-center text-gray-600 mb-4">
            Contamos com financiamento coletivo e patrocínios para manter o Historin.com. Apoie o Historin e nos ajude a cobrir os custos mensais da plataforma.
            </p>
            <div className="flex justify-center">
            <button
                className="bg-[#8A5A44] text-white px-6 py-3 rounded-md hover:bg-[#D8A568] flex items-center space-x-2 transition-transform transform hover:scale-105"
                onClick={handleCopyToClipboard}
            >
                <i className="fas fa-copy"></i>
                <span>Copiar Chave Pix</span>
            </button>
            </div>
      </div>
    </section>
    )
}

export default DonationCard