import Input from "../Input";

export default function AccountForm({ formik }) {
    return (
        <div>
            <h1 className="mt-5 mb-5 text-xl font-medium">Account Information</h1>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Full Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}/>
                <Input
                    label="Email Address"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}/>
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    error={formik.touched.password && formik.errors.password}
                    helper={formik.values.uid && "Leave empty if do not want to change password"}/>
            </div>
        </div>
    )
}