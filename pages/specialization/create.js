import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import {SpecializationService} from "../../services";
import {useFormik} from "formik";
import * as yup from "yup";
import {useRouter} from "next/router";
import Input from "../../components/Input";
import PageTitle from "../../components/PageTitle";

export default function Create() {
    const router = useRouter();
    const validationSchema = yup.object().shape({
        name: yup.string().required("Full name is required")
    });

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validateOnChange: true,
        validationSchema: validationSchema,
        onSubmit: values => {
            SpecializationService.CreateSpecialization(values)
                .then(res => {
                    if (res.data) {
                        router.push("/specialization");
                    }
                })
        }
    });

    return (
        <MainLayout>
            <PageTitle title="Create Specialization" useBack/>
            <Card className="lg:w-1/2 md:w-full mx-auto">
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && formik.errors.name}/>
                    <div className="text-right">
                        <button type="submit" className="h-11 px-10 mt-6 bg-primary text-white text-sm rounded-xl">
                            Submit
                        </button>
                    </div>
                </form>
            </Card>
        </MainLayout>
    )
}