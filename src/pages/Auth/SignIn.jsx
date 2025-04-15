import SignInForm from '../../components/auth/SignInForm';
import PageMeta from '../../components/common/PageMeta';
import AuthLayout from './AuthLayout';

export default function SignIn() {
    return (
        <>
            <PageMeta
                title='Login | JNE Asset & Resource Management System'
                description='Aplikasi manajemen aset dan sumber daya perusahaan'
            />

            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    );
}
