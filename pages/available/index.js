import {useEffect, useState} from "react";
import {DefaultSort} from "../../constants/filter";
import {AvailableService, DoctorService} from "../../services";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import Input from "../../components/Input";
import FilterDialog from "../../components/FilterDialog";
import Select from "../../components/Select";
import Roles from "../../constants/role";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/solid";
import Modal from "../../components/Modal";
import Avatar from "../../components/Avatar";
import {useRouter} from "next/router";
import Image from "next/image";

export default function Available() {
    const router = useRouter();
    const [doctors, setDoctors] = useState([]);
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

        fetchDoctors(query);
    };

    const fetchDoctors = (query) => {
        DoctorService.GetDoctors(query)
            .then(res => {
                setDoctors(res.data.data);
                setPagination(res.data.pagination);
            })
    }

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
                </div>

                <div className="m-5 grid grid-cols-4 gap-4">
                    {doctors.map((e, i) => (
                        <Card key={i} className="text-center">
                            {e.user?.avatar ? (
                                <div className="my-6">
                                    <Image alt="avatar" src={e.user?.avatar} width={128} height={128} className="rounded-full"/>
                                </div>
                            ) : (
                                <Avatar text={e.name} className="h-32 w-32 my-6 text-5xl"/>
                            )}
                            <h2 className="my-2 text-lg font-medium">{e.name}</h2>
                            <div className="my-4 flex flex-wrap gap-4 justify-center">
                                {e.specialization.map((item, j) => (
                                    <span key={j} className="py-1 px-3 text-sm text-primary text-xs font-semibold rounded-xl bg-gray-50">{item.name}</span>
                                ))}
                            </div>
                            <button
                                className="w-32 h-11 rounded-xl bg-primary text-white"
                                onClick={() => router.push(`/available/${e.uid}`)}>
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