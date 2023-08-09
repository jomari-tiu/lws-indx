import React, { useEffect, useState } from "react";
import { DatePicker, Form, TimePicker, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import Image from "next/image";
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
import { Select } from "@components/Select";
import MultipleSelect from "@src/components/MultipleSelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData, postData, postDataNoFormData } from "@utilities/api";
import { Context } from "@utilities/context/Provider";
import { getInitialValue, removeNumberFormatting } from "@utilities/helpers";

export default function AddTreatmentRecordModal({
  show,
  onClose,
  form,
  patientRecord,
  ...rest
}: any) {
  const queryClient = useQueryClient();

  const { setIsAppLoading } = React.useContext(Context);

  const [procedureDetail, setProcedureDetail] = useState<{
    cost: string;
  } | null>(form.getFieldValue("procedure_cost"));

  const quantity = Form.useWatch("quantity", form);

  const procedure_id = Form.useWatch("procedure_id", form);

  useEffect(() => {
    const procedure_cost = procedure_id ? Number(procedureDetail?.cost) : 0;
    const amount = Number(removeNumberFormatting(quantity)) * procedure_cost;
    form.setFieldValue("amount", isNaN(amount) ? 0 : amount);
  }, [procedure_id, quantity]);

  React.useEffect(() => {
    form.setFieldsValue({
      ...form,
      created_at: moment(form?.getFieldValue("created_at")).isValid()
        ? moment(form?.getFieldValue("created_at"))
        : undefined,
    });
  }, [show]);

  const { mutate: addTreatmentRecord } = useMutation(
    (payload: any) => {
      return postDataNoFormData({
        url: `/api/patient/treatment/${patientRecord?._id}`,
        payload,
        options: {
          isLoading: (show: boolean) => setIsAppLoading(show),
        },
      });
    },
    {
      onSuccess: async (res) => {
        notification.success({
          message: "Adding Treatment Record Success",
          description: `Adding Treatment Record Success`,
        });
        form.resetFields();
        queryClient.invalidateQueries({
          queryKey: ["invoice-total"],
        });
        queryClient.invalidateQueries({
          queryKey: ["treatment-record"],
        });
        onClose();
        setProcedureDetail(null);
      },
      onMutate: async (newData) => {
        await queryClient.cancelQueries({
          queryKey: ["treatment-record"],
        });
        const previousValues = queryClient.getQueryData(["treatment-record"]);
        queryClient.setQueryData(["treatment-record"], (oldData: any) =>
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
        queryClient.setQueryData(["treatment-record"], context.previousValues);
      },
      onSettled: async () => {
        queryClient.invalidateQueries({
          queryKey: ["treatment-record"],
        });
      },
    }
  );

  return (
    <Modal
      show={show}
      onClose={() => {
        setProcedureDetail(null);
        onClose();
      }}
      {...rest}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="font-bold text-3xl">New Treatment Record</div>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values: any) => {
            delete values.created_at;
            values.amount = removeNumberFormatting(values.amount);

            addTreatmentRecord(values);
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
          <div className="space-y-4">
            <Form.Item label="Date Created" name="created_at" required={false}>
              <DatePicker
                getPopupContainer={(triggerNode: any) => {
                  return triggerNode.parentNode;
                }}
                placeholder="Date Created"
                disabled={true}
                format="MMMM DD, YYYY"
              />
            </Form.Item>
            {/*          
            <Form.Item
              label="Chart Name"
              name="chart_id"
              required={false}
              initialValue={""}
              className="col-span-12"
            >
              <InfiniteSelect
                placeholder="Select Chart Name"
                id="chart_id"
                api={`${process.env.REACT_APP_API_BASE_URL}/api/patient/charting/${patientRecord._id}?limit=3&for_dropdown=true&page=1`}
                queryKey={["charting-list"]}
                displayValueKey="name"
                returnValueKey="_id"
              />
            </Form.Item> */}

            <Form.Item
              label="Designated Dentist"
              name="doctor_id"
              rules={[
                {
                  required: true,
                  message: "This is required",
                },
              ]}
              required={false}
              className="col-span-12"
            >
              <InfiniteSelect
                placeholder="Select Denstist"
                id="doctor_id"
                api={`${process.env.REACT_APP_API_BASE_URL}/api/account?limit=3&for_dropdown=true&page=1`}
                queryKey={["doctor"]}
                displayValueKey="name"
                returnValueKey="_id"
              />
            </Form.Item>

            <Form.Item
              label="Designated Clinic"
              name="branch_id"
              rules={[
                {
                  required: true,
                  message: "This is required",
                },
              ]}
              required={false}
              className="col-span-12"
            >
              <InfiniteSelect
                placeholder="Select Clinic"
                id="branch_id"
                api={`${process.env.REACT_APP_API_BASE_URL}/api/branch?limit=3&for_dropdown=true&page=1`}
                queryKey={["branch"]}
                displayValueKey="name"
                returnValueKey="_id"
              />
            </Form.Item>

            <Form.Item
              label="Surface"
              name="surface"
              rules={[
                {
                  required: true,
                  message: "This is required",
                },
              ]}
              required={false}
              className="col-span-12"
            >
              <Select placeholder="Select Surface" id="surface">
                <Select.Option value={"Surface 1"}>Surface 1</Select.Option>

                <Select.Option value={"Surface 2"}>Surface 2</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "This is required!",
                },
              ]}
              required={false}
              initialValue={0}
            >
              <NumericFormat
                customInput={Input}
                placeholder="Enter Quantity"
                id="quantity"
                prefix=""
                thousandSeparator
              />
            </Form.Item>

            <Form.Item
              label="Procedure"
              name="procedure_id"
              rules={[
                {
                  required: true,
                  message: "This is required!",
                },
              ]}
              required={false}
            >
              <InfiniteSelect
                placeholder="Select Procedure"
                id="procedure_id"
                api={`${
                  process.env.REACT_APP_API_BASE_URL
                }/api/procedure?limit=3&for_dropdown=true&page=1${getInitialValue(
                  form,
                  "procedure"
                )}`}
                queryKey={["procedure"]}
                displayValueKey="name"
                returnValueKey="_id"
                setSelectedDetail={setProcedureDetail}
              />
            </Form.Item>

            <Form.Item
              label="Tooth No."
              name="tooth_no"
              rules={[
                {
                  required: true,
                  message: "This is required!",
                },
              ]}
              required={false}
            >
              <MultipleSelect
                Selection={["1", "2", "3", "4", "5", "6", "7", "8"]}
                id={"tooth_no"}
                placeholder={"Select Tooth No."}
              />
            </Form.Item>

            <Form.Item
              label="Amount Charge"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "This is required!",
                },
              ]}
              required={false}
            >
              <NumericFormat
                customInput={Input}
                placeholder="Amount Charge"
                id="amount"
                prefix="₱"
                thousandSeparator
              />
            </Form.Item>

            <Form.Item label="Remarks" name="remarks" required={false}>
              <TextArea id="remarks" placeholder="Remarks" />
            </Form.Item>
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button
              appearance="link"
              className="p-4 bg-transparent border-none text-casper-500 font-semibold"
              onClick={() => {
                setProcedureDetail(null);

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
