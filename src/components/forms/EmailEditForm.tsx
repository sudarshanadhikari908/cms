import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import EmailTemplate from '../../components/emailTemplate/emailTemplate';
import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import { editEmailSchema } from '../../schema/emailTemplateSchema';
import ComponentLayout from '../common/ComponentLayout';
import ContentHeader from '../common/ContentHeader';
import Loader from '../common/Loader';

function EmailEditForm(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [serverErrors, setServerErrors] = useState([]);
  const [newBody, setNewBody] = useState<any>(props.data?.body);
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      title: props.data?.title,
      code: props.data?.code,
      target: props.data?.target,
      sender: props.data?.sender,
      subject: props.data?.subject,
      body: props.data?.body,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(editEmailSchema),
  });

  const submitForm = async () => {
    const values = getValues();
    if (Object.keys(errors).length === 0) {
      if (values) {
        await submitAuctionEditForm(values);
      }
    }
  };

  const submitAuctionEditForm = async (values: any) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(`/email-templates/${props.id}`, {
        title: values.title,
        sender: values.sender,
        subject: values.subject,
        code: values.code,
        target: values.target,
        body: newBody,
        isDefault: true,
      });
      window.localStorage.setItem(
        'sessionmessage',
        JSON.stringify({ message: 'Email template updated successfully!', type: 'success' }),
      );
      setIsLoading(false);
      history.push('/email-templates');
    } catch (e) {
      if (e?.response?.status == 422) {
        setServerErrors(e?.response?.data?.message);
      } else {
        const message = e?.response?.data?.message;
        toast.error(message);
      }
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    if (serverErrors.length !== 0) {
      setServerErrors(
        serverErrors.filter((item: any) => {
          return item.name !== e.target.name;
        }),
      );
    }
  };

  const cancelHandler = () => {
    reset();
    history.push('/email-templates');
  };

  return (
    <>
      <Layout>
        <ContentHeader title="Email Templates / Edit" needCreateBtn={false} createUrl="" />
        <ComponentLayout>
          {props.emailLoading ? (
            <Loader isLoading={props.emailLoading} />
          ) : (
            <Card>
              <Form onSubmit={handleSubmit(submitForm)}>
                <Card.Body>
                  <Row>
                    <Col sm={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="require">Title</Form.Label>
                        <Form.Control type="text" {...register('title', { onChange: handleInputChange })} />
                        {/* @ts-ignore */}
                        <p className="invalid-feedback d-block">{errors?.title?.message}</p>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Code</Form.Label>
                        <Form.Control type="text" {...register('code')} readOnly />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Target</Form.Label>
                        <Form.Control type="text" {...register('target')} readOnly />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="require">Subject</Form.Label>
                        <Form.Control type="text" {...register('subject', { onChange: handleInputChange })} />
                        {/* @ts-ignore */}
                        <p className="invalid-feedback d-block">{errors?.subject?.message}</p>
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <Form.Label>Template</Form.Label>
                      <EmailTemplate
                        className="col-sm-12"
                        setNewBody={setNewBody}
                        newBody={newBody}
                        template={props.data?.body}
                      />
                      {/* @ts-ignore */}
                      <p className="invalid-feedback d-block">{errors?.body?.message}</p>
                      {/* </Form.Group> */}
                    </Col>
                    <Col sm={12}>
                      <Form.Group className="mb-3 mt-3">
                        <Form.Label>Email Preview</Form.Label>
                        <div className="email-preview">
                          <div dangerouslySetInnerHTML={{ __html: newBody }}></div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Button type="submit">
                    Update <Loader isLoading={isLoading} />
                  </Button>
                  <Button onClick={cancelHandler} className="ml-2 btn btn-danger">
                    Cancel
                  </Button>
                </Card.Footer>
              </Form>
            </Card>
          )}
        </ComponentLayout>
      </Layout>
    </>
  );
}

export default EmailEditForm;
