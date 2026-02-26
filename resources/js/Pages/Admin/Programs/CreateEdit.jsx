import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { compressImage } from '@/Utils/imageCompression';
import { Editor } from '@tinymce/tinymce-react';

export default function CreateEdit({ program = null }) {
    const isEditing = !!program;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        name: {
            fr: program?.name?.fr || program?.name?.en || '',
        },
        level: program?.level || 'preschool',
        description: {
            fr: program?.description?.fr || program?.description?.en || '',
        },
        objectives: {
            fr: program?.objectives?.fr || (Array.isArray(program?.objectives) ? program.objectives : []) || [],
        },
        curriculum: {
            fr: program?.curriculum?.fr || (Array.isArray(program?.curriculum) ? program.curriculum : []) || [],
        },
        image: null,
        bg_image: null,
        remove_bg_image: false,
        new_gallery_images: [],
        existing_gallery_images: program?.gallery_images || [],
        cta_title: {
            fr: program?.cta_title?.fr || program?.cta_title?.en || '',
        },
        cta_description: {
            fr: program?.cta_description?.fr || program?.cta_description?.en || '',
        },
        cta_image: null,
        remove_cta_image: false,
        cta_file: null,
        remove_cta_file: false,
        order: program?.order || 0,
        is_active: program?.is_active ?? true,
        _method: isEditing ? 'put' : 'post',
    });

    const [preview, setPreview] = useState(program?.image || null);
    const [bgPreview, setBgPreview] = useState(program?.bg_image || null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [ctaPreview, setCtaPreview] = useState(program?.cta_image || null);
    const [isCompressing, setIsCompressing] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsCompressing(true);
            const compressedFile = await compressImage(file, { maxSizeMB: 5, maxWidthOrHeight: 1920 });
            setData('image', compressedFile);

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            setData('image', file);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleBgImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsCompressing(true);
            const compressedFile = await compressImage(file, { maxSizeMB: 5, maxWidthOrHeight: 1920 });
            setData(prev => ({ ...prev, bg_image: compressedFile, remove_bg_image: false }));

            const reader = new FileReader();
            reader.onloadend = () => setBgPreview(reader.result);
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            setData(prev => ({ ...prev, bg_image: file, remove_bg_image: false }));
        } finally {
            setIsCompressing(false);
        }
    };

    const handleGalleryImagesChange = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        setIsCompressing(true);
        const processedFiles = [];
        const newPreviews = [];

        for (const file of files) {
            try {
                const compressedFile = await compressImage(file, { maxSizeMB: 5, maxWidthOrHeight: 1920 });
                processedFiles.push(compressedFile);

                const previewUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(compressedFile);
                });
                newPreviews.push({ file: compressedFile, url: previewUrl });
            } catch (error) {
                console.error('Error compressing gallery image:', error);
                processedFiles.push(file);
                const previewUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
                newPreviews.push({ file, url: previewUrl });
            }
        }

        setData(prev => ({ ...prev, new_gallery_images: [...prev.new_gallery_images, ...processedFiles] }));
        setGalleryPreviews(prev => [...prev, ...newPreviews]);
        setIsCompressing(false);
    };

    const removeExistingGalleryImage = (e, index) => {
        e.preventDefault();
        setData(prev => {
            const updated = [...prev.existing_gallery_images];
            updated.splice(index, 1);
            return { ...prev, existing_gallery_images: updated };
        });
    };

    const removeNewGalleryImage = (e, index) => {
        e.preventDefault();
        setData(prev => {
            const updatedFiles = [...prev.new_gallery_images];
            updatedFiles.splice(index, 1);
            return { ...prev, new_gallery_images: updatedFiles };
        });
        setGalleryPreviews(prev => {
            const updatedPreviews = [...prev];
            updatedPreviews.splice(index, 1);
            return updatedPreviews;
        });
    };

    const handleCtaImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsCompressing(true);
            const compressedFile = await compressImage(file, { maxSizeMB: 2, maxWidthOrHeight: 1080 });
            setData(prev => ({ ...prev, cta_image: compressedFile, remove_cta_image: false }));

            const reader = new FileReader();
            reader.onloadend = () => setCtaPreview(reader.result);
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            setData(prev => ({ ...prev, cta_image: file, remove_cta_image: false }));
        } finally {
            setIsCompressing(false);
        }
    };

    const handleCtaFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData(prev => ({ ...prev, cta_file: file, remove_cta_file: false }));
    };

    const submit = (e) => {
        e.preventDefault();
        const routeName = isEditing ? route('admin.programs.update', program.id) : route('admin.programs.store');
        submitPost(routeName, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Program' : 'Create Program'}>
            <Head title={isEditing ? 'Edit Program' : 'Create Program'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">



                        {/* Name French */}
                        <div className="sm:col-span-3">
                            <label htmlFor="name_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Nom (Français)
                            </label>
                            <input
                                type="text"
                                id="name_fr"
                                value={data.name.fr}
                                onChange={(e) => setData('name', { ...data.name, fr: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            />
                            {errors['name.fr'] && <p className="mt-2 text-sm text-red-600">{errors['name.fr']}</p>}
                        </div>

                        {/* Level */}
                        <div className="sm:col-span-3">
                            <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                                Niveau Académique
                            </label>
                            <select
                                id="level"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            >
                                <option value="preschool">Préscolaire</option>
                                <option value="elementary">Élémentaire</option>
                                <option value="middle">Moyen</option>
                                <option value="secondary">Secondaire</option>
                                <option value="vocational">Formation Professionnelle</option>
                            </select>
                            {errors.level && <p className="mt-2 text-sm text-red-600">{errors.level}</p>}
                        </div>

                        {/* Order */}
                        <div className="sm:col-span-3">
                            <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
                                Ordre d'affichage
                            </label>
                            <input
                                type="number"
                                id="order"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value))}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            />
                        </div>



                        {/* Description French */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Description (Français)
                            </label>
                            <div className="bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 overflow-hidden">
                                <Editor
                                    tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.3.0/tinymce.min.js"
                                    value={data.description.fr}
                                    onEditorChange={(content) => setData('description', { ...data.description, fr: content })}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        branding: false
                                    }}
                                />
                            </div>
                            {errors['description.fr'] && <p className="mt-2 text-sm text-red-600">{errors['description.fr']}</p>}
                        </div>

                        {/* Objectives (French) */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Objectifs Pédagogiques (Français)
                            </label>
                            <div className="space-y-2">
                                {(data.objectives.fr || []).map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => {
                                                const newObjectives = [...data.objectives.fr];
                                                newObjectives[index] = e.target.value;
                                                setData('objectives', { ...data.objectives, fr: newObjectives });
                                            }}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                                            placeholder="Objectif..."
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newObjectives = data.objectives.fr.filter((_, i) => i !== index);
                                                setData('objectives', { ...data.objectives, fr: newObjectives });
                                            }}
                                            className="px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md border border-red-200"
                                        >
                                            Sup.
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setData('objectives', { ...data.objectives, fr: [...(data.objectives.fr || []), ''] })}
                                    className="mt-2 text-sm font-semibold text-violet-600 hover:text-violet-500"
                                >
                                    + Ajouter un objectif
                                </button>
                            </div>
                        </div>

                        {/* Curriculum (French) */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                                Programme Scolaire / Matières (Français)
                            </label>
                            <div className="space-y-2">
                                {(data.curriculum.fr || []).map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => {
                                                const newCurriculum = [...data.curriculum.fr];
                                                newCurriculum[index] = e.target.value;
                                                setData('curriculum', { ...data.curriculum, fr: newCurriculum });
                                            }}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                                            placeholder="Matière..."
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newCurriculum = data.curriculum.fr.filter((_, i) => i !== index);
                                                setData('curriculum', { ...data.curriculum, fr: newCurriculum });
                                            }}
                                            className="px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md border border-red-200"
                                        >
                                            Sup.
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setData('curriculum', { ...data.curriculum, fr: [...(data.curriculum.fr || []), ''] })}
                                    className="mt-2 text-sm font-semibold text-violet-600 hover:text-violet-500"
                                >
                                    + Ajouter une matière
                                </button>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Image du Programme</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                {preview ? (
                                    <div className="text-center">
                                        <img src={preview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <label htmlFor="file-upload-change" className="cursor-pointer text-sm text-violet-600 hover:text-violet-500 font-medium">
                                                Change Image
                                                <input id="file-upload-change" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <button type="button" onClick={() => { setPreview(null); setData('image', null); }} className="text-sm text-red-600 hover:text-red-500 font-medium">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 hover:text-violet-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                            </div>
                            {isCompressing && <p className="mt-2 text-sm text-blue-600">Compressing image...</p>}
                            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                        </div>

                        {/* Background Image Upload */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Image d'arrière-plan (Hero Section)</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                {bgPreview ? (
                                    <div className="text-center w-full">
                                        <img src={bgPreview} alt="Background Preview" className="mx-auto h-48 w-full object-cover rounded-md" />
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <label htmlFor="bg-file-upload-change" className="cursor-pointer text-sm text-violet-600 hover:text-violet-500 font-medium">
                                                Change Image
                                                <input id="bg-file-upload-change" type="file" className="sr-only" onChange={handleBgImageChange} accept="image/*" />
                                            </label>
                                            <button type="button" onClick={() => { setBgPreview(null); setData(prev => ({ ...prev, bg_image: null, remove_bg_image: true })); }} className="text-sm text-red-600 hover:text-red-500 font-medium">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label htmlFor="bg-file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 hover:text-violet-500">
                                                <span>Upload a file</span>
                                                <input id="bg-file-upload" type="file" className="sr-only" onChange={handleBgImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                            </div>
                            {errors.bg_image && <p className="mt-2 text-sm text-red-600">{errors.bg_image}</p>}
                        </div>

                        {/* Gallery Images Upload */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Environnement du programme (Galerie)</label>

                            {/* Existing Images */}
                            {data.existing_gallery_images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {data.existing_gallery_images.map((img, index) => (
                                        <div key={`existing-${index}`} className="relative group rounded-lg overflow-hidden border border-gray-200">
                                            <img src={img} alt={`Gallery ${index}`} className="w-full h-32 object-cover" />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <button type="button" onClick={(e) => removeExistingGalleryImage(e, index)} className="text-white hover:text-red-400 bg-black/50 p-2 rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* New Images Previews */}
                            {galleryPreviews.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {galleryPreviews.map((preview, index) => (
                                        <div key={`new-${index}`} className="relative group rounded-lg overflow-hidden border border-violet-200 ring-2 ring-violet-500 ring-opacity-50">
                                            <img src={preview.url} alt={`New Gallery ${index}`} className="w-full h-32 object-cover" />
                                            <div className="absolute top-2 right-2 bg-violet-600 text-white text-xs px-2 py-1 rounded-full opacity-90">Nouveau</div>
                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <button type="button" onClick={(e) => removeNewGalleryImage(e, index)} className="text-white hover:text-red-400 bg-black/50 p-2 rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                    <div className="mt-4 flex text-sm text-gray-600">
                                        <label htmlFor="gallery-file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 hover:text-violet-500">
                                            <span>Ajouter des images</span>
                                            <input id="gallery-file-upload" type="file" multiple className="sr-only" onChange={handleGalleryImagesChange} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-600">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                            {errors.new_gallery_images && <p className="mt-2 text-sm text-red-600">{errors.new_gallery_images}</p>}
                            {Object.keys(errors).filter(key => key.startsWith('new_gallery_images.')).map((errorKey) => (
                                <p key={errorKey} className="mt-1 text-sm text-red-600">{errors[errorKey]}</p>
                            ))}
                        </div>

                        {/* ========================================= */}
                        {/* CALL TO ACTION SECTION */}
                        {/* ========================================= */}
                        <div className="col-span-full border-t border-gray-900/10 pt-8 mt-8">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Section Call-To-Action (Inscription / Téléchargement)</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Personnalisez la section en bas du programme. Si laissé vide, les informations par défaut apparaîtront.
                            </p>
                        </div>

                        {/* CTA Title */}
                        <div className="sm:col-span-3">
                            <label htmlFor="cta_title_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Titre CTA (Français)
                            </label>
                            <input
                                type="text"
                                id="cta_title_fr"
                                value={data.cta_title.fr}
                                onChange={(e) => setData('cta_title', { ...data.cta_title, fr: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                                placeholder="ex: Prêt à vous inscrire ?"
                            />
                            {errors['cta_title.fr'] && <p className="mt-2 text-sm text-red-600">{errors['cta_title.fr']}</p>}
                        </div>

                        {/* CTA Description */}
                        <div className="sm:col-span-full">
                            <label htmlFor="cta_description_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Description CTA (Français)
                            </label>
                            <textarea
                                id="cta_description_fr"
                                rows={3}
                                value={data.cta_description.fr}
                                onChange={(e) => setData('cta_description', { ...data.cta_description, fr: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                                placeholder={`ex: Découvrez comment notre programme peut façonner l'avenir de votre enfant.`}
                            />
                            {errors['cta_description.fr'] && <p className="mt-2 text-sm text-red-600">{errors['cta_description.fr']}</p>}
                        </div>

                        {/* CTA Image */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Image de la section CTA (Optionnel)</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6">
                                {ctaPreview ? (
                                    <div className="text-center w-full">
                                        <img src={ctaPreview} alt="CTA Preview" className="mx-auto h-32 w-auto object-cover rounded-md" />
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <label htmlFor="cta-image-upload-change" className="cursor-pointer text-sm text-violet-600 hover:text-violet-500 font-medium">
                                                Changer
                                                <input id="cta-image-upload-change" type="file" className="sr-only" onChange={handleCtaImageChange} accept="image/*" />
                                            </label>
                                            <button type="button" onClick={() => { setCtaPreview(null); setData(prev => ({ ...prev, cta_image: null, remove_cta_image: true })); }} className="text-sm text-red-600 hover:text-red-500 font-medium">
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label htmlFor="cta-image-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 hover:text-violet-500">
                                                <span>Uploader</span>
                                                <input id="cta-image-upload" type="file" className="sr-only" onChange={handleCtaImageChange} accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {errors.cta_image && <p className="mt-2 text-sm text-red-600">{errors.cta_image}</p>}
                        </div>

                        {/* CTA File */}
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Fichier à télécharger (Brochure PDF / Image)</label>

                            <div className="mt-2 text-sm text-gray-600 border border-gray-200 rounded-md py-4 px-4 flex flex-col justify-center min-h-[180px]">
                                {(program?.cta_file && !data.remove_cta_file && !data.cta_file) && (
                                    <div className="mb-4 text-green-600 font-medium break-all">
                                        Fichier Actuel : {program.cta_file.split('/').pop()}
                                        <div className="mt-2">
                                            <button type="button" onClick={() => setData(prev => ({ ...prev, remove_cta_file: true }))} className="text-sm text-red-600 hover:text-red-500">Supprimer le fichier</button>
                                        </div>
                                    </div>
                                )}

                                {data.cta_file ? (
                                    <div className="mb-4 text-violet-600 font-medium break-all">
                                        Nouveau Fichier : {data.cta_file.name}
                                        <div className="mt-2">
                                            <button type="button" onClick={() => setData(prev => ({ ...prev, cta_file: null }))} className="text-sm text-red-600 hover:text-red-500">Annuler ce choix</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {data.remove_cta_file && <span className="text-red-500 mb-2">Fichier sera supprimé.</span>}
                                        <label htmlFor="cta-file-upload" className="cursor-pointer font-semibold text-violet-600 hover:text-violet-500 w-auto inline-block">
                                            <span>Choisir un fichier...</span>
                                            <input id="cta-file-upload" type="file" className="sr-only" onChange={handleCtaFileChange} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                                        </label>
                                        <p className="mt-1 text-xs text-gray-500">Si un fichier est ajouté, le bouton "Postuler maintenant" deviendra un bouton "Télécharger".</p>
                                    </>
                                )}
                            </div>
                            {errors.cta_file && <p className="mt-2 text-sm text-red-600">{errors.cta_file}</p>}
                        </div>


                        {/* Active Status */}
                        <div className="sm:col-span-3 border-t border-gray-900/10 pt-8 mt-4">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-900">Active</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <Link href={route('admin.programs.index')} className="text-sm font-semibold text-gray-900">Cancel</Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
