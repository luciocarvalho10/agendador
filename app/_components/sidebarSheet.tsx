'use client';

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { quickSearchOptions } from '../_constants/search';
import SignInDialog from './signInDialog';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

const SidebarSheet = () => {
  const { data } = useSession();
  const isUserLoggedIn = !data?.user;
  const handleLogoutClick = () => signOut();

  return (
    <SheetContent className='overflow-y-auto'>
      <SheetHeader>
        <SheetTitle className='text-left'>Menu</SheetTitle>
      </SheetHeader>

      <div
        className={`flex items-center ${isUserLoggedIn ? 'justify-between' : ''} gap-3 border-b border-solid p-5 pt-0`}>
        {isUserLoggedIn ? (
          <>
            <h2 className='font-bold'>Olá, faça seu login!</h2>

            <Dialog>
              <DialogTrigger render={<Button size='icon' />}>
                <LogInIcon />
              </DialogTrigger>

              <DialogContent className='w-[98%] text-center'>
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            <Avatar>
              <AvatarImage src={`${data?.user?.image}`} />
            </Avatar>

            <div>
              <p className='font-bold'>{data?.user?.name}</p>
              <p className='text-xs'>{data?.user?.email}</p>
            </div>
          </>
        )}
      </div>

      <div className='flex flex-col gap-2 border-b border-solid p-5 pt-0'>
        <SheetClose
          className='flex'
          render={
            <Button
              className='justify-start gap-2'
              variant='ghost'
              render={<Link href='/' />}
              nativeButton={false}
            />
          }
          nativeButton={false}>
          <HomeIcon size={18} />
          Início
        </SheetClose>

        <Button className='justify-start gap-2' variant='ghost'>
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className='flex flex-col gap-2 border-b border-solid p-5 pt-0'>
        {quickSearchOptions.map(option => (
          <SheetClose
            key={option.title}
            render={
              <Button
                className='justify-start gap-2'
                variant='ghost'
                nativeButton={false}
                render={
                  <Link href={`/barbershops?service=${option.title}`} />
                }></Button>
            }
            nativeButton={false}>
            <Image
              src={option.imageUrl}
              height={18}
              width={18}
              alt={option.title}
            />
            {option.title}
          </SheetClose>
        ))}
      </div>

      {data?.user && (
        <div className='flex flex-col gap-2 p-5 pt-0'>
          <Button
            className='justify-start gap-2'
            variant='ghost'
            onClick={handleLogoutClick}>
            <LogOutIcon size={18} />
            Sair da Conta
          </Button>
        </div>
      )}
    </SheetContent>
  );
};

export default SidebarSheet;
