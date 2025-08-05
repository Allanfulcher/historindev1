'use client';

export default function AdFooter() {
    return (
        <div className="px-6 pb-6">
          {/* Footer Image */}
          <img
            src="https://i.postimg.cc/8C184M44/parks-net.png"
            alt="Banner"
            className="mb-4 w-full h-48 object-cover rounded-md border border-amber-200 shadow-sm"
          />

          {/* Buy Tickets Button */}
          <a
            href="https://parksnet.com.br/ingressos/?bookingAgency=2818"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-700 text-white px-4 py-3 rounded-md mb-2 block text-center hover:bg-amber-800 transition-colors duration-200 font-medium shadow-md hover:shadow-amber-200"
          >
            Compre seus ingressos
          </a>

          {/* Footer Text */}
          <div className="text-center text-sm text-amber-900 font-medium mt-4 italic">
            Criado em Gramado
          </div>
        </div>
    );
}
