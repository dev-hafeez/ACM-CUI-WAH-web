import { useEffect, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function EventForm({ onClose, initialData = null }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        dated: "",
        images: [],
        video_link: "",
    });

    // Effect to initialize form with existing data
    useEffect(() => {
        if (initialData) {
            setData({
                id: initialData.id,
                title: initialData.title || "",
                description: initialData.description || "",
                dated: initialData.dated || "",
                images: initialData.images || [],
                video_link: initialData.video_link || "",
            });
        }
    }, [initialData]);

    const [successMessage, setSuccessMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();
        const routeName = initialData ? "event.update" : "event.store";
        const routeParam = initialData ? initialData.id : null;
        post(route(routeName, routeParam), {
            onSuccess: () => {
                setSuccessMessage(
                    `Event ${
                        initialData ? "updated" : "created"
                    } successfully.`,
                );
                setTimeout(() => {
                    window.location.reload(); // Reload the page after a short delay
                }, 1000);
                onClose();
            },
            onError: () => {
                setSuccessMessage(""); // Clear message on error
            },
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: files ? Array.from(files) : value,
        }));
    };

    return (
        <div className="p-6 text-gray-900 font-semibold">
            <p className="text-lg text-gray-800">
                {initialData ? "Edit Event" : "Add new Event"}
            </p>
            <div className="p-6 flex flex-col items-center">
                {successMessage && (
                    <div className="mb-4 text-green-600">{successMessage}</div>
                )}

                <form className="w-full" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            autoComplete="title"
                            isFocused={true}
                            onChange={handleChange}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            name="description"
                            id="description"
                            value={data.description}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            autoComplete="description"
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="dated" value="Dated" />
                        <TextInput
                            id="dated"
                            type="date"
                            name="dated"
                            value={data.dated}
                            className="mt-1 block w-full "
                            autoComplete="dated"
                            onChange={handleChange}
                        />
                        <InputError message={errors.dated} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="images" value="Upload Images" />
                        <TextInput
                            id="images"
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            className="mt-1 p-2 border block w-full"
                            autoComplete="images"
                            onChange={(e) => {
                                let files = Array.from(e.target.files);
                                if (files.length > 3) {
                                    files = files.slice(0, 3);
                                    alert(
                                        "You can only upload up to 3 images. Rest will be discarded.",
                                    );
                                } else if (files.length <= 3) {
                                    setData("images", files);
                                }
                                console.log(files);
                            }}
                        />
                        <InputError message={errors.images} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="video_link"
                            value="Video Link (YT ONLY)"
                        />
                        <TextInput
                            id="video_link"
                            type="url"
                            name="video_link"
                            value={data.video_link}
                            className="mt-1 block w-full"
                            autoComplete="video_link"
                            onChange={handleChange}
                        />
                        <InputError
                            message={errors.video_link}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="ms-4"
                            disabled={processing}
                            type="submit"
                            loading={processing}
                        >
                            {initialData ? "Update Event" : "Add new Event"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
