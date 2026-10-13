import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PROJECTS } from '../constants';
import { Breadcrumbs } from './Breadcrumbs';
import { localizedHref } from '../src/routes';

const project = PROJECTS.find(item => item.id === 'action-register')!;

export const ActionRegisterCase = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';
  const roles = ['manager', 'registrar', 'employee'];
  const steps = ['register', 'assign', 'update', 'review'];
  return <main className="min-h-screen px-6 py-10 font-sans md:px-12 lg:px-24">
    <article className="mx-auto max-w-6xl">
      <Breadcrumbs current={t('actionRegisterCase.title')} />
      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">{t('actionRegisterCase.title')}</h1>
        <p className="mt-4 text-xl text-teal-300">{t('actionRegisterCase.subtitle')}</p>
        <p className="mt-5 text-base leading-7 text-slate-400">{t('projects.items.action-register.description')}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border border-teal-300/40 bg-teal-300/10 px-5 py-3 font-semibold text-teal-300 hover:bg-teal-300/20">{t('actionRegisterCase.try_demo')}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          <span className="text-sm text-slate-400">{t('projects.items.action-register.status')}</span>
        </div>
      </header>
      <figure className="mb-12">
        <img src={`${import.meta.env.BASE_URL}images/projects/action-register.png`} width="1280" height="720" alt={t('actionRegisterCase.screenshot_alt')} decoding="async" className="w-full rounded-lg border border-slate-700" />
        <figcaption className="mt-3 text-sm text-slate-400">{t('actionRegisterCase.screenshot_caption')}</figcaption>
      </figure>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-100">{t('actionRegisterCase.problem_title')}</h2>
            <p className="mt-4 leading-7">{t('actionRegisterCase.problem')}</p>
            <p className="mt-4 leading-7">{t('actionRegisterCase.solution')}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-100">{t('actionRegisterCase.workflow_title')}</h2>
            <ol className="mt-5 list-decimal space-y-4 pl-5">
              {steps.map(step => <li key={step} className="pl-2 leading-7"><strong className="font-semibold text-slate-200">{t(`actionRegisterCase.steps.${step}.title`)}</strong><p>{t(`actionRegisterCase.steps.${step}.text`)}</p></li>)}
            </ol>
          </section>
        </div>
        <div>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-100">{t('actionRegisterCase.roles_title')}</h2>
            <dl className="mt-5 space-y-5">
              {roles.map(role => <div key={role}><dt className="font-semibold text-slate-200">{t(`actionRegisterCase.roles.${role}.title`)}</dt><dd className="mt-1 leading-7">{t(`actionRegisterCase.roles.${role}.text`)}</dd></div>)}
            </dl>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-slate-100">{t('actionRegisterCase.email_title')}</h2>
            <p className="mt-4 leading-7">{t('actionRegisterCase.email')}</p>
            <p className="mt-4 leading-7">{t('actionRegisterCase.implementation')}</p>
          </section>
        </div>
      </div>
      <section className="mt-12 border-y border-slate-700 py-8">
        <h2 className="text-xl font-semibold text-slate-100">{t('actionRegisterCase.demo_title')}</h2>
        <p className="mt-3 max-w-3xl leading-7">{t('actionRegisterCase.demo')}</p>
        <p className="mt-3 max-w-3xl leading-7">{t('actionRegisterCase.boundary')}</p>
      </section>
      <footer className="mt-8 flex flex-wrap items-center justify-between gap-5">
        <a href={localizedHref('/projects/', language)} className="inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-slate-100"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{t('actionRegisterCase.back_projects')}</a>
        <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-slate-100">{t('actionRegisterCase.try_demo')}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
      </footer>
    </article>
  </main>;
};
