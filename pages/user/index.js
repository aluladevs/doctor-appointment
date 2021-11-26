import Link from "next/link";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import {useEffect, useState} from "react";
import {UserService} from "../../services/UserService";
import Input from "../../components/Input";
import Select from "../../components/Select";
import {DefaultSort} from "../../constants/filter";
import FilterDialog from "../../components/FilterDialog";
import Chip from "../../components/Chip";
import IconButton from "../../components/IconButton";
import {PencilAltIcon, PlusIcon, TrashIcon} from "@heroicons/react/solid";

export default function User() {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [filter, setFilter] = useState({
        limit: 2,
        page: 1,
        sort: DefaultSort[0].value
    });

    useEffect(() => {
        handleFilter(filter);
    }, [filter]);

    const handleFilter = (params) => {
        UserService.GetUsers(params)
            .then(res => {
                setUsers(res.data.data);
                setPagination(res.data.pagination);
            })
    }

    return (
        <MainLayout
            title="User">
            <Card>
                <div className="p-5 rounded-xl flex gap-4">
                    <Input placeholder="Search by name or email"/>
                    <FilterDialog>
                        <Select
                            className="my-3"
                            label="Sort by"
                            name="sort"
                            selected={DefaultSort.find(e => e.value === filter.sort)?.name}
                            value={filter.sort}
                            options={DefaultSort}/>
                        <Select
                            className="my-3"
                            label="Role"
                            name="role"
                            selected={DefaultSort.find(e => e.value === filter.sort)?.name}
                            value={filter.sort}
                            options={DefaultSort}/>
                    </FilterDialog>
                    <Link href="/user/create">
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
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th className="text-right">Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map((e, i) => (
                        <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.role.join(", ")}</td>
                            <td>
                                {e.status === 1 ? (
                                    <Chip className="bg-success text-white">Active</Chip>
                                ) : (
                                    <Chip className="bg-red-700 text-white">Non Active</Chip>
                                )}
                            </td>
                            <td className="flex gap-4 justify-end">
                                <IconButton color="yellow-400">
                                    <PencilAltIcon className="h-4 w-4 text-white"/>
                                </IconButton>
                                <IconButton color="red-400">
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
            </Card>
        </MainLayout>
    )
}
