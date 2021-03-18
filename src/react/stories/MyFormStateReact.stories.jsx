import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as YUP from 'yup';
import { action as actionAddon } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { MyFormStateProvider } from '../index';
import FormNested from './MyFormNested.container';
import MyFormNestedOnlyValidateAsync from './MyFormNestedOnlyValidateAsync.container';
import Form from './MyForm.container';

// eslint-disable-next-line
window.__DON_T_USE_PUSH_REDUX_CHANGE_TO_STORYBOOK = (type, data) => {
  actionAddon(`REDUCER-ACTION/${type}`)(data);
};

const onSubmit = (data) => {
  actionAddon(`FORM-SUBMITTED`)(data);
};

storiesOf(`React/MyFormState`, module)
  .addDecorator((story) => <div style={{ width: '30em' }}> {story()} </div>)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      source: true,
      maxPropsIntoLine: 1,
    },
  })
  .add('Vary Basic', () =>
    withState({})(({ store }) => {
      const initialStateBasic = { name: 'test 1', familyName: 'test 2', alias: 'test 2', favoriteColor: 'test 4' };
      return (
        <Form
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
          initialState={initialStateBasic}
        />
      );
    })(),
  )
  .add('Vary Basic with context', () =>
    withState({})(() => {
      const initialStateBasic = { name: 'test 1', familyName: 'test 2', alias: 'test 2', favoriteColor: 'test 4' };
      const initialStateBasic2 = { name: 'test 2', familyName: 'test 66', alias: 'test 88', favoriteColor: 'test 99' };
      return (
        <MyFormStateProvider name="ContextForms">
          <Form onSubmit={onSubmit} initialState={initialStateBasic} />
          <Form onSubmit={onSubmit} initialState={initialStateBasic2} />
        </MyFormStateProvider>
      );
    })(),
  )
  .add('Basic, YUP schema - empty initial', () =>
    withState({})(({ store }) => {
      const schema = YUP.object().shape({
        name: YUP.string().required(),
        familyName: YUP.string().required(),
        favoriteColor: YUP.string().required(),
        alias: YUP.string().required(),
      });

      const emptyState = { name: '', familyName: '', alias: '', favoriteColor: '' };

      return (
        <Form
          schema={schema}
          emptyState={emptyState}
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
        />
      );
    })(),
  )
  .add('Basic, JSON schema - empty initial', () =>
    withState({})(({ store }) => {
      const schema = {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            minLength: 1,
          },
          familyName: {
            type: 'string',
            minLength: 1,
          },
          favoriteColor: {
            type: 'string',
            minLength: 1,
          },
          alias: {
            type: 'string',
            minLength: 1,
          },
        },
        required: ['name', 'familyName', 'favoriteColor', 'alias'],
      };

      const emptyState = { name: '', familyName: '', alias: '', favoriteColor: '' };

      return (
        <Form
          jsonSchemaUsingAjv={schema}
          emptyState={emptyState}
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
        />
      );
    })(),
  )
  .add('Basic, YUP schema', () =>
    withState({})(({ store }) => {
      const schema = YUP.object().shape({
        name: YUP.string().required(),
        familyName: YUP.string().required(),
        favoriteColor: YUP.string().required(),
        alias: YUP.string().required(),
      });

      const initialState = { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' };
      const emptyState = { name: '', familyName: '', alias: '', favoriteColor: '' };

      return (
        <Form
          schema={schema}
          initialState={initialState}
          emptyState={emptyState}
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
        />
      );
    })(),
  )
  .add('Basic, YUP schema - no initial', () =>
    withState({})(({ store }) => {
      const schema = YUP.object().shape({
        name: YUP.string().required(),
        familyName: YUP.string().required(),
        favoriteColor: YUP.string().required(),
        alias: YUP.string().required(),
      });

      const initialState = { name: undefined, familyName: undefined, alias: undefined, favoriteColor: undefined };
      const emptyState = { name: '', familyName: '', alias: '', favoriteColor: '' };

      return (
        <Form
          schema={schema}
          initialState={initialState}
          emptyState={emptyState}
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
        />
      );
    })(),
  )
  .add(
    'Nested state, YUP schema',
    withState({})(({ store }) => {
      const schema = YUP.object().shape({
        profileOne: YUP.object().shape({
          name: YUP.string().required(),
          familyName: YUP.string().required(),
          favoriteColor: YUP.string().required(),
          alias: YUP.string().required(),
        }),
        profileTwo: YUP.object().shape({
          name: YUP.string().required(),
          familyName: YUP.string().required(),
          favoriteColor: YUP.string().required(),
          alias: YUP.string().required(),
        }),
      });

      const initialState = {
        profileOne: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
        profileTwo: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
      };
      const emptyState = {
        profileOne: { name: '', familyName: '', alias: '', favoriteColor: '' },
        profileTwo: { name: '', familyName: '', alias: '', favoriteColor: '' },
      };

      return (
        <FormNested
          schema={schema}
          initialState={initialState}
          emptyState={emptyState}
          asyncValidation
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
        />
      );
    }),
  )
  .add(
    'Nested state, YUP schema - only one profile',
    withState({})(({ store }) => {
      const schema = YUP.object().shape({
        profileOne: YUP.object().shape({
          name: YUP.string().required(),
          familyName: YUP.string().required(),
          favoriteColor: YUP.string().required(),
          alias: YUP.string().required(),
        }),
      });

      const initialState = {
        profileOne: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
        profileTwo: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
      };
      const emptyState = {
        profileOne: { name: '', familyName: '', alias: '', favoriteColor: '' },
        profileTwo: { name: '', familyName: '', alias: '', favoriteColor: '' },
      };

      return (
        <FormNested
          schema={schema}
          initialState={initialState}
          emptyState={emptyState}
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
        />
      );
    }),
  )
  .add(
    'Nested state, YUP schema async',
    withState({})(({ store }) => {
      const schema = YUP.object().shape({
        profileOne: YUP.object().shape({
          name: YUP.string().required(),
          familyName: YUP.string().required(),
          favoriteColor: YUP.string().required(),
          alias: YUP.string().required(),
        }),
      });

      const initialState = {
        profileOne: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
        profileTwo: { name: 'Jon', familyName: 'Doe', alias: 'guiyep', favoriteColor: 'red' },
      };
      const emptyState = {
        profileOne: { name: '', familyName: '', alias: '', favoriteColor: '' },
        profileTwo: { name: '', familyName: '', alias: '', favoriteColor: '' },
      };

      return (
        <MyFormNestedOnlyValidateAsync
          schema={schema}
          initialState={initialState}
          emptyState={emptyState}
          onFormWasUpdated={(formState) => store.set({ ...formState })}
          onSubmit={onSubmit}
        />
      );
    }),
  );
