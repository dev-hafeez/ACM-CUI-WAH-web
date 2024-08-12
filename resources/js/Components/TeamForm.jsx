import { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function TeamForm({ onClose, initialData = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: "",
        email: "",
        position: "",
        club: "",
        img: "",
    });

    // Effect to initialize form with existing data
    useEffect(() => {
        if (initialData) {
            setData({
                id: initialData.id,
                name: initialData.name || "",
                email: initialData.email || "",
                position: initialData.position || "",
                club: initialData.club || "",
                img: initialData.img || "",
            });
        }
    }, [initialData]);

    console.log(initialData);

    const [successMessage, setSuccessMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (initialData) {
            post(route("team.update", initialData.id), {
                onSuccess: () => {
                    setSuccessMessage("Team record updated successfully.");
                    setTimeout(() => {
                        window.location.reload(); // Reload the page after a short delay
                    }, 1000);
                    onClose();
                    console.log("success");
                },
                onError: () => {
                    console.log("failed");

                    setSuccessMessage(""); // Clear message on error
                },
            });
        } else {
            post(route("team.store"), {
                onSuccess: () => {
                    setSuccessMessage("Team record created successfully.");
                    setTimeout(() => {
                        window.location.reload(); // Reload the page after a short delay
                    }, 1000);
                    onClose();
                    console.log("success");
                },
                onError: () => {
                    setSuccessMessage(""); // Clear message on error
                },
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    return (
        <div className="p-6 text-gray-900 font-semibold">
            <p className="text-lg text-gray-800">
                {initialData ? "Edit Team" : "Add new Team"}
            </p>
            <div className="p-6 flex flex-col items-center">
                {successMessage && (
                    <div className="mb-4 text-green-600">{successMessage}</div>
                )}

                <form className="w-full" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={handleChange}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="img" value="Upload Image" />
                        <TextInput
                            id="img"
                            type="file"
                            name="img"
                            accept="image/*"
                            className="mt-1 p-2 border block w-full"
                            autoComplete="img"
                            onChange={handleChange}
                        />
                        <InputError message={errors.img} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="position" value="Position" />
                        <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="position"
                            id="position"
                            onChange={handleChange}
                            value={data.position}
                        >
                            <option value="" disabled hidden>
                                Select position
                            </option>
                            <option value="President">President</option>
                            <option value="Vice President">Vice President</option>
                            <option value="Director Operations">Director Operations</option>
                            <option value="External Affairs">External Affairs</option>
                            <option value="General Manager">General Manager</option>
                            <option value="General Secretary">General Secretary</option>
                            <option value="Treasurer">Treasurer</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Co Lead">Co Lead</option>
                            <option value="Member">Member</option>
                        </select>
                        <InputError
                            message={errors.position}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="club" value="Club" />
                        <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="club"
                            id="club"
                            onChange={handleChange}
                            value={data.club}
                        >
                            <option value="" disabled hidden>
                                Select club
                            </option>
                            <option value="Code Hub">Code Hub</option>
                            <option value="Executives">Executives</option>
                            <option value="Events and Logistics">Events and Logistics</option>
                            <option value="Registration and Décor">Registration and Décor</option>
                            <option value="Graphics & Media">Graphics & Media</option>
                        </select>
                        <InputError message={errors.club} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="ms-4"
                            disabled={processing}
                            type="submit"
                            loading={processing}
                        >
                            {initialData ? "Update Team" : "Add new Team"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
