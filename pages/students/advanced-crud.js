import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';

const { Column } = Table;

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/students');
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      message.error('Failed to fetch students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingStudent) {
        await axios.put(`/api/students?id=${editingStudent.id}`, values);
        message.success('Student updated');
      } else {
        await axios.post('/api/students', values);
        message.success('Student added');
      }
      fetchStudents(); // Refresh list
    } catch (e) {
      message.error('Operation failed');
    }
    setIsModalVisible(false);
    setEditingStudent(null);
    form.resetFields();
  };

  const openAddModal = () => {
    setEditingStudent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingStudent(record);
    form.setFieldsValue({
      name: record.name,
      nis: record.nis,
      class: record.class_name,
      major: record.major,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students?id=${id}`);
      message.success('Student deleted');
      fetchStudents(); // Refresh list
    } catch (e) {
      message.error('Failed to delete student');
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>Students</h1>
      <Input
        placeholder="Search by name or major"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16, marginLeft: 16 }}>
        Add Student
      </Button>

      <Table dataSource={filteredStudents} loading={loading} rowKey="id" pagination={{ pageSize: 10 }}>
        <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
        <Column title="NIS" dataIndex="nis" key="nis" />
        <Column title="Class" dataIndex="class_name" key="class_name" sorter={(a, b) => (a.class_name || '').localeCompare(b.class_name || '')} />
        <Column title="Major" dataIndex="major" key="major" />
        <Column
          title="Actions"
          key="actions"
          render={(_, record) => (
            <>
              <Button type="link" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Popconfirm
                title="Delete this student?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        />
      </Table>

      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingStudent(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="nis" label="NIS" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="class" label="Class" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="major" label="Major" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingStudent ? 'Save' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
