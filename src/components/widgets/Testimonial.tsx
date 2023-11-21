import Image from 'next/image';

import { testimonialData } from '@/shared/data';
import HeaderWidget from '../common/HeaderWidget';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';

const Testimonial = () => {
  const { header, testimonials } = testimonialData;

  return (
    <section className="bg-primary-50 dark:bg-slate-800" id="testimonial">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {header && <HeaderWidget header={header} titleClassname="text-2xl sm:text-3xl" />}
        <div className="flex items-stretch justify-center">
          <div className="grid grid-cols-3 gap-3 dark:text-white sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {testimonials.map(({ name, occupation, comment, image, icon: Icon, href }, index) => (
              <div
                key={`item-testimonial-${index}`}
                className="col-span-3 flex sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"
              >
                <Card className="w-[350px]">
                    <CardHeader>
                      <CardTitle className="flex flex-row">
                        {image && (
                          <Avatar>
                            <AvatarImage
                              src={image.src}
                              alt={image.alt}
                              className=""
                            />
                          </Avatar>
                        )}
                        <div className="items-end px-4">
                          <h3 className="font-semibold">{name}</h3>
                          <span className="">{occupation}</span>
                        </div>
                      </CardTitle>
                      
                    </CardHeader>
                    <CardContent>
                      
                    {comment && (
                      <p className="m-b-30 font-light dark:text-slate-400">{`"${comment.slice(0, 150)}..."`}</p>
                    )}
                    </CardContent>
                    <CardFooter className="items-end">
                    {href && Icon && <Icon className="mx-auto mt-4 h-6 w-6 text-primary-600 dark:text-slate-200" />}
                    </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
