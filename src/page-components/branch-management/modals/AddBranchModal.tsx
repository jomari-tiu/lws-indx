import React, { useEffect } from "react";
import { Form, TimePicker, notification } from "antd";
import { AnimatePresence } from "framer-motion";
import moment from "moment";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { NumericFormat, PatternFormat } from "react-number-format";
import { scroller } from "react-scroll";
import { AnimateContainer } from "@components/animation";
import { down, fadeIn } from "@components/animation/animation";
import { Button } from "@components/Button";
import { InfiniteSelect } from "@components/InfiniteSelect";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { Select } from "@components/Select";
import TimeRangePicker from "@src/components/TimeRangePicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData, postData } from "@utilities/api";
import { Context } from "@utilities/context/Provider";
import days from "@utilities/global-data/days";

export default function AddBranchModal({ show, onClose, form, ...rest }: any) {
  let id = form.getFieldValue("_id");

  const queryClient = useQueryClient();

  const { setIsAppLoading } = React.useContext(Context);

  const schedules = Form.useWatch("schedules", form);

  useEffect(() => {
    if (schedules?.length <= 0 && !id) {
      form.setFieldValue("schedules", [
        {
          day: "Monday",
          time_range: ["08:00 AM", "05:00 PM"],
        },
        {
          day: "Tuesday",
          time_range: ["08:00 AM", "05:00 PM"],
        },
        {
          day: "Wednesday",
          time_range: ["08:00 AM", "05:00 PM"],
        },
        {
          day: "Thursday",
          time_range: ["08:00 AM", "05:00 PM"],
        },
        {
          day: "Friday",
          time_range: ["08:00 AM", "05:00 PM"],
        },
        {
          day: "Saturday",
          time_range: ["08:00 AM", "05:00 PM"],
        },
      ]);
    }
  }, [schedules]);

  const { mutate: addBranch } = useMutation(
    (payload: any) => {
      return postData({
        url: "/api/branch",
        payload,
        options: {
          isLoading: (show: boolean) => setIsAppLoading(show),
        },
      });
    },
    {
      onSuccess: async (res) => {
        notification.success({
          message: "Adding Branch Success",
          description: `Adding Branch Success`,
        });
        form.resetFields();
        onClose();
      },
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: ["branch"] });
        const previousValues = queryClient.getQueryData(["branch"]);
        queryClient.setQueryData(["branch"], (oldData: any) =>
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
        queryClient.setQueryData(["branch"], context.previousValues);
      },
      onSettled: async () => {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      },
    }
  );

  const { mutate: editBranch } = useMutation(
    (payload: any) => {
      return postData({
        url: `/api/branch/${payload.id}?_method=PUT`,
        payload,
        options: {
          isLoading: (show: boolean) => setIsAppLoading(show),
        },
      });
    },
    {
      onSuccess: async (res) => {
        notification.success({
          message: "Editing Branch Success",
          description: `Editing Branch Success`,
        });
        form.resetFields();
        onClose();
      },
      onMutate: async (newData) => {
        await queryClient.cancelQueries({ queryKey: ["branch"] });
        const previousValues = queryClient.getQueryData(["branch"]);
        queryClient.setQueryData(["branch"], (oldData: any) =>
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
        queryClient.setQueryData(["branch"], context.previousValues);
      },
      onSettled: async () => {
        queryClient.invalidateQueries({ queryKey: ["branch"] });
      },
    }
  );

  let dentalchair: number[] = [];
  for (let i = 1; i <= 30; i++) {
    dentalchair = [...dentalchair, i];
  }

  const country = Form.useWatch("country", form);

  return (
    <Modal show={show} onClose={onClose} {...rest}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="font-bold text-3xl">
            {!id ? "Add" : "Update"} Clinic Branch
          </div>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            values.schedules = values.schedules.map((item: any) => {
              return {
                day: item.day,
                open_time: item.time_range[0],
                close_time: item.time_range[1],
              };
            });
            values.schedules = JSON.stringify(values.schedules);
            if (!id) {
              addBranch(values);
            } else {
              values.id = id;
              editBranch(values);
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
          <div className="space-y-4">
            <h4>Branch Info</h4>
            <div className="grid lg:grid-cols-3 gap-4">
              <Form.Item
                label="Branch Name"
                name="name"
                rules={[{ required: true, message: "This is required!" }]}
                required={true}
                className="col-span-3 lg:col-span-1"
              >
                <Input id="name" placeholder="Branch Name" />
              </Form.Item>
              <Form.Item
                label="Mobile Number"
                name="mobile_no"
                rules={[
                  { required: true, message: "This is required!" },
                  {
                    pattern: /^(09)\d{2}-\d{3}-\d{4}$/,
                    message: "Please use correct format!",
                  },
                ]}
                required={true}
                className="col-span-3 lg:col-span-1"
              >
                <PatternFormat
                  customInput={Input}
                  placeholder="09XX-XXX-XXXXX"
                  patternChar="*"
                  format="****-***-****"
                  allowEmptyFormatting={false}
                  id="mobile_no"
                />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "This is required!" },
                  { type: "email", message: "Must be a valid email" },
                ]}
                required={true}
                className="col-span-3 lg:col-span-1"
              >
                <Input id="email" placeholder="juandelacruz@xxxxx.xxx" />
              </Form.Item>
              <Form.Item
                label="Chair Quantity"
                name="chair_quantity"
                rules={[{ required: true, message: "This is required!" }]}
                required={true}
                className="col-span-3 lg:col-span-1"
              >
                <Select
                  id="chair_quantity"
                  placeholder="Chair Quantiy"
                  className="border-transparent"
                  noFilter={true}
                >
                  {dentalchair.map((item, index) => (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="space-y-4">
            <h4>Address</h4>
            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                label="Country"
                required={true}
                className="col-span-full lg:col-span-1"
                shouldUpdate={(prev, curr) => {
                  return true;
                }}
              >
                {({ getFieldValue, resetFields }) => {
                  return (
                    <Form.Item
                      name="country"
                      rules={[
                        { required: true, message: "Country is required" },
                      ]}
                    >
                      <InfiniteSelect
                        placeholder="Country"
                        id="country"
                        api={`${process.env.REACT_APP_API_BASE_URL}/api/location/country?limit=3&for_dropdown=true&page=1`}
                        getInitialValue={{
                          form,
                          initialValue: "country",
                        }}
                        queryKey={["country", getFieldValue("country")]}
                        initialValue={getFieldValue("country")}
                        displayValueKey="name"
                        returnValueKey="_id"
                        onChange={() => {
                          resetFields(["city", "barangay", "province"]);
                        }}
                      />
                    </Form.Item>
                  );
                }}
              </Form.Item>

              {country === "Philippines" ||
              country === "174" ||
              country === undefined ||
              country === "" ? (
                <>
                  <Form.Item
                    label="Province"
                    required={true}
                    className="col-span-full lg:col-span-1"
                    shouldUpdate={(prev, curr) => {
                      return true;
                    }}
                  >
                    {({ getFieldValue, resetFields }) => {
                      return (
                        <Form.Item
                          name="province"
                          rules={[
                            { required: true, message: "Province is required" },
                          ]}
                        >
                          <InfiniteSelect
                            placeholder="Province"
                            id="province"
                            api={`${process.env.REACT_APP_API_BASE_URL}/api/location/province?limit=3&for_dropdown=true&page=1`}
                            getInitialValue={{
                              form,
                              initialValue: "province",
                            }}
                            queryKey={["province", getFieldValue("country")]}
                            displayValueKey="name"
                            returnValueKey="_id"
                            disabled={Boolean(!getFieldValue("country"))}
                            onChange={() => {
                              resetFields(["city", "barangay"]);
                            }}
                          />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                  <Form.Item
                    label="City"
                    required={true}
                    className="col-span-full lg:col-span-1"
                    shouldUpdate={(prev, curr) => {
                      return true;
                    }}
                  >
                    {({ getFieldValue, resetFields }) => {
                      return (
                        <Form.Item
                          name="city"
                          rules={[
                            { required: true, message: "City is required" },
                          ]}
                        >
                          <InfiniteSelect
                            placeholder="City"
                            id="city"
                            api={`${
                              process.env.REACT_APP_API_BASE_URL
                            }/api/location/city?limit=3&for_dropdown=true&page=1&province_code=${getFieldValue(
                              "province"
                            )}`}
                            getInitialValue={{
                              form,
                              initialValue: "city",
                            }}
                            queryKey={["city", getFieldValue("province")]}
                            displayValueKey="name"
                            returnValueKey="_id"
                            disabled={Boolean(
                              !getFieldValue("country") ||
                                !getFieldValue("province")
                            )}
                            onChange={() => {
                              resetFields(["barangay"]);
                            }}
                          />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                  <Form.Item
                    label="Barangay"
                    required={true}
                    className="col-span-full lg:col-span-1"
                    shouldUpdate={(prev, curr) => {
                      return true;
                    }}
                  >
                    {({ getFieldValue, resetFields }) => {
                      return (
                        <Form.Item
                          name="barangay"
                          rules={[
                            { required: true, message: "City is required" },
                          ]}
                        >
                          <InfiniteSelect
                            placeholder="Barangay"
                            id="barangay"
                            api={`${
                              process.env.REACT_APP_API_BASE_URL
                            }/api/location/barangay?limit=3&for_dropdown=true&page=1&province_code=${getFieldValue(
                              "province"
                            )}&city_code=${getFieldValue("city")}`}
                            getInitialValue={{
                              form,
                              initialValue: "barangay",
                            }}
                            queryKey={["barangay", getFieldValue("city")]}
                            displayValueKey="name"
                            returnValueKey="_id"
                            disabled={Boolean(
                              !getFieldValue("country") ||
                                !getFieldValue("province") ||
                                !getFieldValue("city")
                            )}
                          />
                        </Form.Item>
                      );
                    }}
                  </Form.Item>
                  <Form.Item
                    label="Street"
                    name="street"
                    rules={[{ required: true, message: "Street is required" }]}
                    required={true}
                    className="col-span-full lg:col-span-1"
                  >
                    <Input id="street" placeholder="Add street name" />
                  </Form.Item>
                  <Form.Item
                    label="Zip Code"
                    name="zip_code"
                    className="col-span-full lg:col-span-1"
                  >
                    <NumericFormat
                      customInput={Input}
                      id="zip_code"
                      allowNegative={false}
                      placeholder="Zip Code"
                      isAllowed={(values) => {
                        const { floatValue } = values;
                        if (Number(floatValue) > Number(9999999999)) {
                          return false;
                        } else {
                          return true;
                        }
                      }}
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Address is required" }]}
                    required={true}
                    className="col-span-full lg:col-span-1"
                  >
                    <Input id="street" placeholder="Add full address" />
                  </Form.Item>
                  <Form.Item
                    label="Postal Code"
                    name="postal_code"
                    className="col-span-full lg:col-span-1"
                  >
                    <NumericFormat
                      customInput={Input}
                      id="postal_code"
                      allowNegative={false}
                      placeholder="Postal Code"
                      isAllowed={(values) => {
                        const { floatValue } = values;
                        if (Number(floatValue) > Number(9999999999)) {
                          return false;
                        } else {
                          return true;
                        }
                      }}
                    />
                  </Form.Item>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4>Clinic Schedule</h4>
            <div className="grid grid-cols-1 gap-4">
              <Form.List name="schedules" initialValue={[]}>
                {(fields, { add, remove }) => {
                  return (
                    <>
                      <AnimatePresence>
                        {fields.map(({ name, key, ...rest }) => {
                          return (
                            <AnimateContainer
                              variants={down}
                              key={key}
                              triggerOnce={true}
                            >
                              <div
                                style={{ zIndex: 999 - name }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-300 p-4 pt-4 rounded-md relative"
                              >
                                {fields.length > 1 ? (
                                  <AiFillMinusCircle
                                    className="absolute top-0 right-3 z-10 m-2 text-danger text-3xl cursor-pointer"
                                    onClick={() => remove(name)}
                                  />
                                ) : null}
                                <Form.Item
                                  label="Days"
                                  name={[name, "day"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "This is required!",
                                    },
                                  ]}
                                  required={true}
                                  className="col-span-2 md:col-span-1"
                                  {...rest}
                                >
                                  <Select
                                    placeholder="Days"
                                    className=" z-10"
                                    id={["schedules", name, "day"].join("-")}
                                  >
                                    {days
                                      ?.filter(
                                        (filterItem) =>
                                          !schedules?.some(
                                            (someItem: any) =>
                                              someItem?.day === filterItem
                                          )
                                      )
                                      .map((day, index) => {
                                        return (
                                          <Select.Option
                                            value={day}
                                            key={index}
                                          >
                                            {day}
                                          </Select.Option>
                                        );
                                      })}
                                  </Select>
                                </Form.Item>

                                <Form.Item
                                  label="Time Range"
                                  name={[name, "time_range"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Time is required",
                                    },
                                  ]}
                                  required={true}
                                  className="col-span-2 md:col-span-1"
                                  getValueFromEvent={(e) => {
                                    if (e) {
                                      if (
                                        moment(e[0]).isSameOrAfter(moment(e[1]))
                                      ) {
                                        return [e[0], null];
                                      }

                                      return e;
                                    }
                                  }}
                                >
                                  <TimeRangePicker
                                    onChange={(value) => {
                                      const { ...rest } = form.getFieldValue(
                                        "schedules"
                                      );
                                      Object.assign(rest[name], {
                                        time_range: value,
                                      });
                                    }}
                                    isTime={[]}
                                    id={["schedules", name, "day"].join("-")}
                                    autoTimeEndRange={8}
                                  />
                                </Form.Item>
                              </div>
                            </AnimateContainer>
                          );
                        })}
                      </AnimatePresence>
                      <div className="border border-gray-300 p-4 pt-8 rounded-md relative">
                        <div className="blur-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Form.Item
                            label="Days"
                            required={true}
                            {...rest}
                            className="col-span-2 md:col-span-1"
                          >
                            <Select placeholder="Days">
                              {days.map((day, index) => {
                                return (
                                  <Select.Option value={day} key={index}>
                                    {day}
                                  </Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="Time Range"
                            required={true}
                            className="col-span-2 md:col-span-1"
                          >
                            <TimePicker format="HH:mm" minuteStep={15} />
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
