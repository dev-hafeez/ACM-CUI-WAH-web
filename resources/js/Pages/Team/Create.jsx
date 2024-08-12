import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { post } from "@inertiajs/react";

export default function Create({  processing, errors }) {
    const [data, setData] = useState({
        name: "",
        email: "",
        position: "",
        club: "",
        img: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("team.store"));
    };


    return (
        <div className="p-6 text-gray-900 font-semibold">
            <div>Add new member</div>
            <div className="p-6 flex flex-col items-center">
                <form className="w-1/2" onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="title" value="Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
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
                            multiple
                            className="mt-1 p-2 border block w-full"
                            autoComplete="img"
                            onChange={(e) => {
                                let file = e.target.files[0];
                                const validImageTypes = [
                                    "image/jpeg",
                                    "image/png",
                                    "image/gif",
                                ];

                                if (file) {
                                    if (!validImageTypes.includes(file.type)) {
                                        alert(
                                            "Invalid file format. Please upload a JPEG, PNG, or GIF image.",
                                        );
                                    } else {
                                        setData("img", file);
                                    }
                                } else {
                                    alert("Please upload a single image.");
                                }
                                console.log(file);
                            }}
                        />
                        <InputError message={errors.img} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="position" value="Position" />
                        <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="position"
                            id="position"
                        >
                            <option value="" disabled hidden>
                                Select position
                            </option>
                            <option value="Executive"> Executive</option>
                            <option value="Team Lead">Team Lead</option>
                            <option value="Member">Member</option>
                        </select>
                        <InputError message={errors.position} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="club" value="Club" />
                        <select
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            name="club"
                            id="club"
                        >
                            <option value="" disabled hidden>
                                Select club
                            </option>
                            <option value="Code Hub"> Code Hub</option>
                            <option value="Graphics & Media">Graphics & Media</option>
                            <option value="Decor">Decor</option>
                        </select>
                        <InputError message={errors.club} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className="ms-4"
                            disabled={processing}
                            type="submit"
                            loading={processing}
                            onClick={() => post(route("team.store"), data)}
                        >
                            Add new Task
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
