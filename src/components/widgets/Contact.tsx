

import { contactData } from '@/shared/data';
import { Lang } from '@/utils/i18n';


import HeaderWidget from '../common/HeaderWidget';

interface SubmitProps {
  lang: Lang
}
/*
function isSubmit(props: SubmitProps) {
  if (!props.searchParams) return false;
  return Object.keys(props.searchParams).includes('thing')
}*/

export const Contact:React.FC<SubmitProps> = ({lang}) => {
  const { header, content, items, form } = contactData;


  async function handleSubmit (data: FormData) {
    'use server';
    console.log(data)

    /*
    await sendMail({
      subject: "My First Email",
      to: "david.hockley@gmail.com",
      component: <Welcome  />,
    });*/
    // ...
  }

  /*
  console.log(props)
  if (isSubmit(props)) {
    //const result = await save(props.searchParams)
    console.log("submit");
    //if (result.ok) {
    //  return redirect('/list-things?success=Created'
    //}
  }*/

  return (
    <section className="bg-primary-50 dark:bg-slate-800" id="contact">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {header && <HeaderWidget header={header} titleClassname="text-3xl sm:text-5xl" />}
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2 md:items-center">
            <div className="h-full pr-6">
              {content && <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">{content}</p>}
              <ul className="mb-6 md:mb-0">
                {items.map(({ title, description, icon: Icon }, index) => (
                  <li key={`item-contact-${index}`} className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <div className="ml-4 mb-4">
                      <h4 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h4>
                      {typeof description === 'string' ? (
                        <p key={`text-description-${index}`} className="text-gray-600 dark:text-slate-400">
                          {description}
                        </p>
                      ) : (
                        description &&
                        description.map((desc, index) => (
                          <p key={`text-description-${index}`} className="text-gray-600 dark:text-slate-400">
                            {desc}
                          </p>
                        ))
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card h-full p-5 md:p-8">
              <h2 className="text-2xl font-bold">{form.title}</h2>
              <p>{form.description}</p>
              <form id="contactForm" className="mt-4" action={handleSubmit}>
                <div className="mb-4">
                  <div className="my-1 grid grid-cols-1 md:my-0">
                    {form.inputs.map(({ type, name, placeholder }, index) => (
                      <div key={`item-input-${index}`} className="my-1 mx-0">
                        <input
                          type={type}
                          name={name}
                          placeholder={placeholder}
                          className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300"
                        />
                        <div className="invalid-feedback" style={{ display: 'block' }}></div>
                      </div>
                    ))}
                    <div className="mx-0 my-1">
                      <textarea
                        name="text"
                        cols={30}
                        rows={5}
                        placeholder="Write your message..."
                        className="w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300"
                      ></textarea>
                      <div className="invalid-feedback" style={{ display: 'block' }}></div>
                    </div>
                    <input type="hidden" name="lang" value={lang} />
                  </div>
                </div>
                <button type={form.btn.type} className="btn btn-primary sm:mb-0">
                  {form.btn.title}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
