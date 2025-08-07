'use client'

const YoutubeSection = () => {
    return (
        <section className="mt-16 px-4">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-gray-900 mb-8 text-center tracking-tight">
                Videos
            </h2>
            <div className="rounded-xl overflow-hidden shadow-lg border border-amber-100 bg-white">
                <iframe
                    src="https://www.youtube.com/embed/videoseries?list=PL7HcHb8oOEF8p3w7QAc5LPFVVaBP1SNoP"
                    title="YouTube playlist"
                    className="w-full h-[500px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </section>
    );
};

export default YoutubeSection;
