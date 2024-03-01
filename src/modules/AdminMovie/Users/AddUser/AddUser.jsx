import React, { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Select, notification } from "antd";
import { apiAddUser } from "../../../../apis/userAPI";
import { useFormik } from "formik";

export default function AddUser() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "GP08",
    },
    onSubmit: (values) => {
      console.log(values);
      apiAddUser(values)
        .then((res) => {
          console.log(res);
          notification.success({
            message: "Add user successfully!",
          });
          setTimeout(() => {
            window.location.href = "/admin/users-list";
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: "Add user failed!",
            description: err.response.data.content,
          });
        });
    },
  });

  const handleChangeAuth = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
    console.log("Loại người dùng: ", value);
  };

  return (
    <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3 mt-16">
            <div
              className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 
                  border-transparent border-solid shadow-xl rounded-2xl bg-clip-border"
            >
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h3 className="ml-3 mb-2 mt-3 font-bold">Add User</h3>
              </div>

              <div className="flex justify-between px-0 pt-0 pb-2 mt-3">
                <div className=" w-[100%] p-0 overflow-x-auto">
                  <Form
                    form={form}
                    name="horizontal_login"
                    onSubmitCapture={formik.handleSubmit}
                  >
                    <div className="form-row">
                      <Form.Item
                        name={["hoTen"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input full name!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Full name"
                          name="hoTen"
                          onChange={formik.handleChange}
                        />
                      </Form.Item>

                      <Form.Item
                        name={["taiKhoan"]}
                        rules={[
                          { required: true, message: "Please input email!" },
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Username"
                          name="taiKhoan"
                          onChange={formik.handleChange}
                        />
                      </Form.Item>
                    </div>

                    <div className="form-row">
                      <Form.Item
                        name={["matKhau"]}
                        rules={[
                          { required: true, message: "Please input password!" },
                          {
                            pattern:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/,
                            message:
                              "Password must be 8-16 characters and contain at least one uppercase letter, one lowercase letter, and one number",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="Password"
                          name="matKhau"
                          onChange={formik.handleChange}
                        />
                      </Form.Item>

                      <Form.Item
                        name={["email"]}
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <MailOutlined className="site-form-item-icon" />
                          }
                          type="mail"
                          placeholder="Email"
                          name="email"
                          onChange={formik.handleChange}
                        />
                      </Form.Item>
                    </div>

                    <div className="form-row">
                      <Form.Item
                        name={["soDT"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input phone number!",
                          },
                          {
                            pattern: /^[0-9]{10}$/,
                            message: "Phone number must be exactly 10 digits",
                          },
                        ]}
                      >
                        <Input
                          prefix={
                            <PhoneOutlined className="site-form-item-icon" />
                          }
                          type="number"
                          placeholder="Phone number"
                          name="soDT"
                          onChange={formik.handleChange}
                        />
                      </Form.Item>

                      <Form.Item
                        name={["maLoaiNguoiDung"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input authority!",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Authority"
                          size="large"
                          onChange={handleChangeAuth}
                          name="maLoaiNguoiDung"
                        >
                          <Select.Option value="QuanTri">
                            Quản trị viên
                          </Select.Option>
                          <Select.Option value="KhachHang">
                            Khách hàng
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div className="form-row">
                      <Button
                        className="text-gray-500 font-semibold rounded-md w-full md:w ml-2"
                        htmlType="submit"
                        disabled={
                          !form.isFieldsTouched(true) ||
                          !!form
                            .getFieldsError()
                            .filter(({ errors }) => errors.length).length
                        }
                        onClick={() => form.resetFields()}
                      >
                        Add user
                      </Button>

                      <Button
                        className="text-gray-500 font-semibold rounded-md w-full md:w"
                        htmlType="reset"
                        onClick={() => form.resetFields()}
                      >
                        Reset
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
