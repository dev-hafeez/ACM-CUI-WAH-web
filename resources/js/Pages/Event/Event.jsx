import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import EventForm from "@/Components/EventForm";
import { usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

export default function Events({ auth, events }) {
    const flash = usePage().props;
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOption, setFilterOption] = useState("");

    const openModal = (event = null) => {
        setEditingEvent(event);
        setModalOpen(true);
    };
    const closeModal = () => {
        setEditingEvent(null);
        setModalOpen(false);
    };

    useEffect(() => {
        if (flash.success) {
            setFlashMessage(flash.success);
            window.location.reload();
        }
    }, [flash]);

    const filteredEvents = events.filter(
        (event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            event.dated.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Events
                </h2>
            }
        >
            <Head title="Events" />

            {flashMessage && (
                <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
                    {flashMessage}
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between mb-6">
                                <TextInput
                                    id="search"
                                    type="search"
                                    name="search"
                                    className="mt-1 block"
                                    autoComplete="search"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                <div className="flex space-x-4">
                                    <Menu>
                                        <MenuHandler>
                                            <Button
                                                variant="outlined"
                                                className="h-fit py-2"
                                            >
                                                Filter
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    setFilterOption("title")
                                                }
                                            >
                                                Title
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setFilterOption(
                                                        "description",
                                                    )
                                                }
                                            >
                                                Description
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setFilterOption("dated")
                                                }
                                            >
                                                Date
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <PrimaryButton
                                        className="w-fit h-fit"
                                        onClick={() => openModal()}
                                    >
                                        Add new event
                                    </PrimaryButton>
                                </div>
                            </div>

                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Images
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Video Link
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredEvents.map((event) => (
                                            <tr key={event.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {event.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {event.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {event.dated}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {event.images &&
                                                        JSON.parse(
                                                            event.images
                                                        ).map(
                                                            (image, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={
                                                                        "/storage/" +
                                                                        image
                                                                    }
                                                                    className="w-20 mb-2"
                                                                    alt={`Event Image ${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                />
                                                            )
                                                        )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <a
                                                        href={event.video_link}
                                                        className="text-blue-500"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Video
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <button
                                                        onClick={() =>
                                                            openModal(event)
                                                        }
                                                        className="text-blue-500"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal}>
                <EventForm onClose={closeModal} initialData={editingEvent} />
            </Modal>
        </AuthenticatedLayout>
    );
}
