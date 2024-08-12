import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import TeamForm from "@/Components/TeamForm";
import { usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

export default function Dashboard({ auth, teams }) {
    const flash = usePage().props;
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterOption, setFilterOption] = useState("");

    const openModal = (team = null) => {
        setEditingTeam(team);
        setModalOpen(true);
    };
    const closeModal = () => {
        setEditingTeam(null);
        setModalOpen(false);
    };

    useEffect(() => {
        if (flash.success) {
            setFlashMessage(flash.success);
            window.location.reload();
        }
    }, [flash]);

    const filteredTeams = teams.filter(
        (team) =>
            team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.position.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Teams
                </h2>
            }
        >
            <Head title="Teams" />

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
                                            <Button variant="outlined" className="h-fit py-2">
                                                Filter
                                            </Button>
                                        </MenuHandler>
                                        <MenuList>
                                            <MenuItem
                                                onClick={() =>
                                                    setFilterOption("name")
                                                }
                                            >
                                                Name
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setFilterOption("email")
                                                }
                                            >
                                                Email
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setFilterOption("club")
                                                }
                                            >
                                                Club
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setFilterOption("position")
                                                }
                                            >
                                                Position
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <PrimaryButton
                                        className="w-fit h-fit"
                                        onClick={() => openModal()}
                                    >
                                        Add new team
                                    </PrimaryButton>
                                </div>
                            </div>

                            <div className="">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Club
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Position
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Img
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredTeams.map((team) => (
                                            <tr key={team.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {team.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {team.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {team.club}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {team.position}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <img
                                                        src={team.img}
                                                        alt=""
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <button
                                                        onClick={() =>
                                                            openModal(team)
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
                <TeamForm onClose={closeModal} initialData={editingTeam} />
            </Modal>
        </AuthenticatedLayout>
    );
}
