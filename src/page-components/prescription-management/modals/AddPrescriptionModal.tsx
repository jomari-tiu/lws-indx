import React from "react";
import { Form, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import { scroller } from "react-scroll";
import { AnimateContainer } from "@components/animation";
import { fadeIn } from "@components/animation/animation";
import { Button } from "@components/Button";
import { InfiniteSelect } from "@components/InfiniteSelect";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "@utilities/api";
import { Context } from "@utilities/context/Provider";

export default function AddPrescriptionManagementModal({
  show,
  onClose,
  form,
  ...rest
}: any) {
  const queryClient = useQueryClient();
  const { setIsAppLoading } = React.useContext(Context);

  const { mutate: addPrescription } = useMutation(
    (payload: any) => {
      return postData({
        url: "/api/prescription",
        payload,
        options: {
          isLoading: (show: boolean) => setIsAppLoading(show),
        },
      });
    },
    {
      onSuccess: async (res) => {
        notification.success({
          message: "Adding New Prescription Success",
          description: `Adding New Prescription Success`,
        });
        form.resetFields();
        onClose();
      },
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: ["prescription"] });
        const previousValues = queryClient.getQueryData(["prescription"]);
        queryClient.setQueryData(["prescription"], (oldData: any) =>
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
        queryClient.setQueryData(["prescription"], context.previousValues);
      },
      onSettled: async () => {
        queryClient.invalidateQueries({ queryKey: ["prescription"] });
      },
    }
  );

  const { mutate: editPrescription } = useMutation(
    (payload: any) => {
      return postData({
        url: `/api/prescription/${payload.id}?_method=PUT`,
        payload,
        options: {
          isLoading: (show: boolean) => setIsAppLoading(show),
        },
      });
    },
    {
      onSuccess: async (res) => {
        notification.success({
          message: "Editing Prescription Success",
          description: `Editing Prescription Success`,
        });
        form.resetFields();
        onClose();
      },
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: ["prescription"] });
        const previousValues = queryClient.getQueryData(["prescription"]);
        queryClient.setQueryData(["prescription"], (oldData: any) =>
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
        queryClient.setQueryData(["prescription"], context.previousValues);
      },
      onSettled: async () => {
        queryClient.invalidateQueries({ queryKey: ["prescription"] });
      },
    }
  );

  return (
    <Modal show={show} onClose={onClose} {...rest}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="font-bold text-3xl">Create Prescription Template</div>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            let id = form.getFieldValue("_id");

            values.medicines = JSON.stringify(values.medicines);

            if (!id) {
              addPrescription(values);
            } else {
              values.id = id;
              editPrescription(values);
            }
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Form.Item
              label="Prescription Name"
              name="name"
              rules={[{ required: true, message: "This is required!" }]}
              required={true}
            >
              <Input id="name" placeholder="Prescription Name" />
            </Form.Item>
          </div>
          <div className="space-y-4">
            <h4>Medicine List</h4>
            <div className="grid grid-cols-1 gap-4">
              <Form.List
                name="medicines"
                initialValue={[{ medicine_id: "", quantity: "", sig: "" }]}
              >
                {(fields, { add, remove }) => {
                  return (
                    <>
                      <AnimatePresence>
                        {fields.map(({ name, key }) => {
                          return (
                            <motion.div
                              key={key}
                              initial={{ y: -100 }}
                              animate={{
                                y: 0,
                              }}
                              exit={{
                                y: 100,
                              }}
                              className="grid grid-cols-1 lg:grid-cols-3 gap-4 border border-gray-300 p-4 pt-4 rounded-md relative"
                            >
                              {fields.length > 1 ? (
                                <AiFillMinusCircle
                                  className="absolute top-0 z-10 right-3 m-2 text-danger text-3xl cursor-pointer"
                                  onClick={() => remove(name)}
                                />
                              ) : null}
                              <Form.Item
                                label="Medicine"
                                name={[name, "medicine_id"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Medicine is required",
                                  },
                                ]}
                                required={true}
                                className="col-span-3 lg:col-span-1"
                              >
                                <InfiniteSelect
                                  placeholder="Medicine"
                                  id={["medicines", name, "medicine_id"].join(
                                    "-"
                                  )}
                                  api={`${process.env.REACT_APP_API_BASE_URL}/api/medicine?limit=3&for_dropdown=true&page=1`}
                                  queryKey={["medicineList"]}
                                  displayValueKey="name"
                                  returnValueKey="_id"
                                />
                              </Form.Item>
                              <Form.Item
                                label="Quantity"
                                name={[name, "quantity"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Quantity is required",
                                  },
                                ]}
                                required={true}
                                className="col-span-3 lg:col-span-1"
                              >
                                <NumericFormat
                                  placeholder="Quantity"
                                  id={["medicines", name, "quantity"].join("-")}
                                  customInput={Input}
                                  thousandSeparator=","
                                  thousandsGroupStyle="thousand"
                                />
                              </Form.Item>
                              <Form.Item
                                label="Sig"
                                name={[name, "sig"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Sig is required",
                                  },
                                ]}
                                required={true}
                                className="col-span-3 lg:col-span-1"
                              >
                                <Input
                                  id={["medicines", name, "sig"].join("-")}
                                  placeholder="Sig"
                                />
                              </Form.Item>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                      <div className="border border-gray-300 p-4 pt-8 rounded-md relative">
                        <div className="blur-sm grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <Form.Item
                            label="Medicine"
                            required={true}
                            className="col-span-3 lg:col-span-1"
                          >
                            <InfiniteSelect
                              placeholder="Select Reason for Visit"
                              id="reason_for_visit"
                              api={`${process.env.REACT_APP_API_BASE_URL}/api/procedure?limit=3&for_dropdown=true&page=1`}
                              queryKey={["procedureList"]}
                              displayValueKey="name"
                              returnValueKey="_id"
                            />
                          </Form.Item>
                          <Form.Item
                            label="Quantity"
                            required={true}
                            className="col-span-3 lg:col-span-1"
                          >
                            <NumericFormat
                              placeholder="Quantity"
                              customInput={Input}
                              thousandSeparator=","
                              thousandsGroupStyle="thousand"
                            />
                          </Form.Item>
                          <Form.Item
                            label="Sig"
                            required={true}
                            className="col-span-3 lg:col-span-1"
                          >
                            <Input placeholder="Sig" />
                          </Form.Item>
                        </div>
                        <div
                          className="absolute top-0 left-0 h-full w-full flex justify-center items-center cursor-pointer"
                          onClick={() => add()}
                        >
                          <IoMdAddCircle className="text-7xl text-primary" />
                        </div>
                      </div>
                    </>
                  );
                }}
              </Form.List>
              <Form.Item
                label="Additional Instructions"
                name="additional_instructions"
                rules={[{ required: true, message: "This is required!" }]}
                required={true}
              >
                <TextArea
                  id="additional_instructions"
                  placeholder="Additional Instructions"
                  rows={8}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button
              appearance="link"
              className="p-4 bg-transparent border-none text-casper-500 font-semibold"
              onClick={() => onClose()}
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
