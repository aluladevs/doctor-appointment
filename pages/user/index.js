import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import {useEffect, useState} from "react";
import {UserService} from "../../services/UserService";
import Input from "../../components/Input";
import Select from "../../components/Select";
import {DefaultSort} from "../../constants/filter";
import FilterDialog from "../../components/FilterDialog";

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
    console.log(filter.sort)
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
                </div>
                <table className="w-full table-auto">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map((e, i) => (
                        <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.role.join(", ")}</td>
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
