import React from 'react';

export default function SchoolDescription() {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Le Groupe Scolaire Les Jumelles (GSLJ)
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Le Groupe Scolaire Les Jumelles (GSLJ) à , Sénégal, est un établissement privé bilingue dédié à l'excellence éducative du cycle collège au lycée. Situé dans un environnement sûr et stimulant, il offre un encadrement de qualité pour préparer les élèves à réussir dans un monde plurilingue et compétitif.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <article className="flex flex-col items-start justify-between bg-blue-50 p-8 rounded-2xl">
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-blue-900 group-hover:text-gray-600">
                                Collège
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                Au collège du GSLJ, les élèves bénéficient d'un enseignement axé sur les fondamentaux : mathématiques, sciences, langues et humanités. Des activités périscolaires favorisent l'épanouissement personnel, la créativité et le développement des compétences sociales dans un cadre bienveillant. L'objectif est de favoriser une transition sereine vers le lycée tout en instaurant des méthodes d'apprentissage autonomes.
                            </p>
                        </div>
                    </article>
                    <article className="flex flex-col items-start justify-between bg-blue-50 p-8 rounded-2xl">
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-blue-900 group-hover:text-gray-600">
                                Lycée
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                Le lycée propose un parcours complet homologué, avec des filières générales préparant au baccalauréat et aux études supérieures. Les programmes intègrent des technologies modernes, des projets personnels et un suivi individualisé par une équipe pédagogique expérimentée. Les élèves sont encouragés à exceller dans les domaines artistiques, scientifiques et linguistiques pour un avenir international.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
