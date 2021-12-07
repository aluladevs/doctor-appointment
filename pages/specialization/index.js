import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import {useEffect, useState} from "react";
import {SpecializationService} from "../../services";
import Input from "../../components/Input";
import Select from "../../components/Select";
import {DefaultSort} from "../../constants/filter";
import FilterDialog from "../../components/FilterDialog";
import Chip from "../../components/Chip";
import IconButton from "../../components/IconButton";
import {PencilAltIcon, PlusIcon, TrashIcon} from "@heroicons/react/solid";
import {router} from "next/client";
import Roles from "../../constants/role";
import Modal from "../../components/Modal";

export default function Specialization() {
    const [specializations, setSpecializations] = useState([]);
    const [pagination, setPagination] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const [filter, setFilter] = useState({
        limit: 20,
        page: 1,
        sort: DefaultSort[0]
    });
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        handleFilter(filter);
    }, [filter]);

    const handleFilter = (params) => {
        const query = {...params};

        if (params.sort) {
            query.sort = params.sort.value;
        }

        if (params.role) {
            if (params.role.value === -1) {
                delete query.role;
            } else {
                query.role = params.role.value;
            }
        }

        fetchSpecializations(query);
    };

    const fetchSpecializations = (query) => {
        SpecializationService.GetSpecializations(query)
            .then(res => {
                setSpecializations(res.data.data);
                setPagination(res.data.pagination);
            })
    }

    const deleteData = () => {
        if (selected) {
            SpecializationService.DeleteSpecialization(selected._id)
                .then(res => {
                    if (res) {
                        setDeleteModal(false);
                        handleFilter(filter);
                    }
                });
        }
    }

    return (
        <MainLayout
            title="Specialization">

            <Card>
                <div className="p-5 rounded-xl flex gap-4">
                    <Input
                        name="keyword"
                        value={filter.keyword ?? ''}
                        onChange={({ target }) => setFilter({...filter, keyword: target.value})}
                        placeholder="Search by name or email"/>
                    <FilterDialog>
                        <Select
                            className="my-3"
                            label="Sort by"
                            name="sort"
                            value={filter.sort}
                            options={DefaultSort}
                            onChange={({ target }) => setFilter({...filter, sort: target.value})}/>
                    </FilterDialog>
                    <Link href="/specialization/create">
                        <button className="w-36 h-11 px-4 flex items-center justify-center rounded-xl bg-primary text-white text-sm">
                            <PlusIcon className="w-4 mr-1"/>
                            Add Data
                        </button>
                    </Link>
                </div>
                <table className="w-full table-auto">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th className="text-right">Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {specializations?.map((e, i) => (
                        <tr key={i}>
                            <td>{e.name}</td>
                            <td className="flex gap-4 justify-end">
                                <IconButton color="yellow-400" onClick={() => router.push(`/specialization/${e._id}`)}>
                                    <PencilAltIcon className="h-4 w-4 text-white"/>
                                </IconButton>
                                <IconButton color="red-400" onClick={() => {
                                    setDeleteModal(true);
                                    setSelected(e);
                                }}>
                                    <TrashIcon className="h-4 w-4 text-white"/>
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <Pagination
                    onChange={(val) => setFilter({...filter, page: val})}
                    pages={pagination.pages}
                    page={pagination.page}/>

                <Modal open={deleteModal} title="Delete Confirmation" onClose={() => setDeleteModal(false)}>
                    <p>Are you sure want to delete this data?</p>
                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            onClick={() => setDeleteModal(false)}
                            className="px-5 py-2 text-gray-600 text-sm">Cancel</button>
                        <button
                            onClick={deleteData}
                            className="px-5 py-2 rounded-xl bg-red-500 text-white text-sm">Delete</button>
                    </div>
                </Modal>
            </Card>
        </MainLayout>
    )
}
