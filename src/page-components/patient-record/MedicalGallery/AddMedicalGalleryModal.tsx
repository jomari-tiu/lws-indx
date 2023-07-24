import React from "react";
import { DatePicker, Form, TimePicker, notification } from "antd";
import { Select } from "antd";
import { Checkbox } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import Image from "next/image";
import { AiOutlineInbox } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import { scroller } from "react-scroll";
import { arrayBuffer } from "stream/consumers";
import { AnimateContainer } from "@components/animation";
import { fadeIn } from "@components/animation/animation";
import Annotate from "@components/Annotate";
import { Button } from "@components/Button";
import { InfiniteSelect } from "@components/InfiniteSelect";
import Input from "@components/Input";
import Modal from "@components/Modal";

import Uploader from "@src/components/Uploader";
import UploaderMultiple from "@src/components/UploaderMultiple";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData, postData } from "@utilities/api";
import { Context } from "@utilities/context/Provider";
import {
    getBase64,
    getInitialValue,
    removeNumberFormatting,
} from "@utilities/helpers";


export default function AddMedicalGalleryModal({
    show,
    onClose,
    form,
    patientRecord,
    ...rest
}: any) {
    const queryClient = useQueryClient();
    const { setIsAppLoading } = React.useContext(Context);

    let [image, setImage] = React.useState({
        imageUrl: "",
        error: false,
        file: null,
        loading: false,
        edit: false,
    });
    function handleChange(info: any) {
        if (info.file.status === "uploading") {
            return setImage({
                ...image,
                loading: true,
                file: null,
                edit: false,
            });
        }

        if (info.file.status === "error") {
            return setImage({
                ...image,
                loading: false,
                error: true,
                edit: false,
            });
        }

        if (info.file.status === "done") {
            getBase64(info.file.originFileObj, (imageUrl: string) => {
                setImage({
                    ...image,
                    imageUrl,
                    loading: false,
                    file: info.file,
                    edit: false,
                });
            });
            return info.file.originFileObj;
        }
    }

    const { mutate: addMedicalGallery } = useMutation(
        (payload: any) => {
            return postData({
                url: `/api/patient/medical-gallery/${patientRecord?._id}`,
                payload,
                options: {
                    isLoading: (show: boolean) => setIsAppLoading(show),
                },
            });
        },
        {
            onSuccess: async (res) => {
                notification.success({
                    message: "Adding Gallery Success",
                    description: `Adding gallery-list Success`,
                });
                form.resetFields();
                onClose();
            },
            onMutate: async (newData) => {
                await queryClient.cancelQueries({
                    queryKey: ["medical-gallery"],
                });
                const previousValues = queryClient.getQueryData([
                    "medical-gallery",
                ]);
                queryClient.setQueryData(["medical-gallery"], (oldData: any) =>
                    oldData ? [...oldData, newData] : undefined
                );

                return { previousValues };
            },
            onError: (err: any, _, context: any) => {
                notification.warning({
                    message: "Something Went Wrong",
                    description: `${
                        err.response.data[Object.keys(err.response.data)[0]]
                    }`,
                });
                queryClient.setQueryData(
                    ["medical-gallery"],
                    context.previousValues
                );
            },
            onSettled: async () => {
                queryClient.invalidateQueries({
                    queryKey: ["medical-gallery"],
                });
            },
        }
    );

    const { mutate: editMedicalGallery } = useMutation(
        (payload: any) => {
            return postData({
                url: `/api/medical-gallery/update/${payload.id}?_method=PUT`,
                payload,
                options: {
                    isLoading: (show: boolean) => setIsAppLoading(show),
                },
            });
        },
        {
            onSuccess: async (res) => {
                notification.success({
                    message: "Gallery Updated!",
                    description: `Gallery Updated!`,
                });
                form.resetFields();
                onClose();
            },
            onMutate: async (newData) => {
                await queryClient.cancelQueries({
                    queryKey: ["medical-gallery"],
                });
                const previousValues = queryClient.getQueryData([
                    "medical-gallery",
                ]);
                queryClient.setQueryData(["medical-gallery"], (oldData: any) =>
                    oldData ? [...oldData, newData] : undefined
                );

                return { previousValues };
            },
            onError: (err: any, _, context: any) => {
                notification.warning({
                    message: "Something Went Wrong",
                    description: `${
                        err.response.data[Object.keys(err.response.data)[0]]
                    }`,
                });
                queryClient.setQueryData(
                    ["medical-gallery"],
                    context.previousValues
                );
            },
            onSettled: async () => {
                queryClient.invalidateQueries({
                    queryKey: ["medical-gallery"],
                });
            },
        }
    );

    return (
        <Modal show={show} onClose={() => {}} {...rest}>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="font-bold text-3xl">New Gallery</div>
                </div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        let id = form.getFieldValue("_id");
                        values.legend_periodical_screening = JSON.stringify(
                            values.legend_periodical_screening
                        );
                        values.images = values.images.fileList;

                        console.log(values);

                        // if (!id) {
                        //     addChart(values);
                        // } else {
                        //     values.id = id;
                        //     editChart(values);
                        // }
                    }}
                    onFinishFailed={(data) => {
                        scroller.scrollTo(
                            data?.errorFields[0]?.name?.join("-")?.toString(),
                            {
                                smooth: true,
                                offset: -50,
                                containerId: rest?.id,
                            }
                        );
                    }}
                    className="space-y-12"
                >
                    <div className="grid grid-cols-1 gap-4">
                        <Form.Item
                            label="Select Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "This is required!",
                                },
                            ]}
                            required={false}
                        >
                            <Select placeholder="Category" id="category">
                                <Select.Option value={"Before and After"}>
                                    Before and After
                                </Select.Option>

                                <Select.Option value={"Xray"}>
                                    Xray
                                </Select.Option>
                                <Select.Option value={"Videos"}>
                                    Videos
                                </Select.Option>
                                <Select.Option value={"Others"}>
                                    Others
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Form.Item
                            label=""
                            name="images"
                            rules={[
                                {
                                    required: true,
                                    message: "This is required!",
                                },
                            ]}
                            required={false}
                        >
                            <UploaderMultiple
                                image={image}
                                setImage={(value: any) => setImage(value)}
                                onChange={handleChange}
                                id="images"
                                className="[&_.ant-upload]:!border-0 h-full w-full bg-none"
                                wrapperClassName="h-full w-full border flex justify-center items-center border-dashed p-4"
                            >
                                <div className=" w-full flex justify-center flex-col items-center">
                                    <AiOutlineInbox className=" text-5xl text-primary-500 mb-2" />
                                    <h3 className=" text-center mb-2 text-2xl">
                                        Click or drag-file to this area to
                                        upload
                                    </h3>
                                    <p className=" text-center text-lg text-gray-400">
                                        Support for a single or bulk upload.
                                        Stricktly prohibit from uploading
                                        company data or other band files
                                    </p>
                                </div>
                            </UploaderMultiple>
                        </Form.Item>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                        <Button
                            appearance="link"
                            className="p-4 bg-transparent border-none text-casper-500 font-semibold"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            appearance="primary"
                            className="max-w-[10rem]"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}
