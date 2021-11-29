import {useEffect, useState} from "react";
import {DefaultSort} from "../../constants/filter";
import {AvailableService} from "../../services";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import Input from "../../components/Input";
import FilterDialog from "../../components/FilterDialog";
import Select from "../../components/Select";
import Roles from "../../constants/role";
import Link from "next/link";
import {PencilAltIcon, PlusIcon, TrashIcon} from "@heroicons/react/solid";
import Modal from "../../components/Modal";
import Avatar from "../../components/Avatar";
import {useRouter} from "next/router";

export default function Available() {
    const router = useRouter();
    const [available, setAvailable] = useState([]);
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

        fetchAvailable(query);
    };

    const fetchAvailable = (query) => {
        AvailableService.GetAvailable(query)
            .then(res => {
                if (res.data?.data) {
                    setAvailable(res.data.data);
                    setPagination(res.data.data);
                }
            })
    };

    const deleteData = () => {
        if (selected) {
            AvailableService.DeleteAvailable(selected._id)
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
            title="Available Slots">

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
                        <Select
                            className="my-3"
                            label="Role"
                            name="role"
                            value={filter.role}
                            options={[{name: "All Role", value: -1}, ...Object.keys(Roles).map(key => Roles[key])]}
                            onChange={({ target }) => setFilter({...filter, role: target.value})}/>
                    </FilterDialog>
                    <Link href="/available/create">
                        <button className="w-36 h-11 px-4 flex items-center justify-center rounded-xl bg-primary text-white text-sm">
                            <PlusIcon className="w-4 mr-1"/>
                            Add Data
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {available.map((e, i) => (
                        <Card key={i} className="text-center">
                            <Avatar text={e.doctor?.name} className="h-32 w-32 my-6 text-5xl"/>
                            <h2>{e.doctor?.name}</h2>
                            <button onClick={() => router.push(`/available/doctor/${e.doctor.uid}`)}>
                                Detail
                            </button>
                        </Card>
                    ))}
                </div>

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