import React from 'react';

export default function SchoolDescription() {
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Le Groupe Scolaire Les Jumelles (GSLJ)
                    </h2>
                    <div className="mt-8 text-lg leading-8 text-gray-600 space-y-4">
                        <p className="font-semibold text-xl text-primary">
                            Bienvenue au Groupe Scolaire Privé Bilingue Les Jumelles
                        </p>
                        <p>
                            Nous vous souhaitons la bienvenue sur le site officiel de notre établissement. Ici, chaque enfant est au cœur de notre mission : lui offrir une éducation de qualité, alliant rigueur académique, bilinguisme et épanouissement personnel.
                        </p>
                        <p>
                            Notre équipe pédagogique engagée et passionnée œuvre chaque jour pour former des citoyens responsables, autonomes et ouverts sur le monde.
                        </p>
                        <p className="font-medium text-gray-700">
                            Découvrez nos programmes, nos valeurs et rejoignez-nous pour bâtir ensemble l'avenir de vos enfants.
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <article className="flex flex-col items-start justify-between bg-violet-50 p-8 rounded-2xl">
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-violet-900 group-hover:text-primary">
                                Collège
                            </h3>
                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                Au collège du GSLJ, les élèves bénéficient d'un enseignement axé sur les fondamentaux : mathématiques, sciences, langues et humanités. Des activités périscolaires favorisent l'épanouissement personnel, la créativité et le développement des compétences sociales dans un cadre bienveillant. L'objectif est de favoriser une transition sereine vers le lycée tout en instaurant des méthodes d'apprentissage autonomes.
                            </p>
                        </div>
                    </article>
                    <article className="flex flex-col items-start justify-between bg-violet-50 p-8 rounded-2xl">
                        <div className="group relative">
                            <h3 className="mt-3 text-lg font-semibold leading-6 text-violet-900 group-hover:text-primary">
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
