import SignUpForm from '../../components/auth/SignUpForm';
import PageMeta from '../../components/common/PageMeta';
import AuthLayout from './AuthLayout';

export default function SignUp() {
    return (
        <>
            <PageMeta
                title='Register | JNE Asset & Resource Management System'
                description='Aplikasi manajemen aset dan sumber daya perusahaan'
            />

            <AuthLayout>
                <SignUpForm />
            </AuthLayout>
        </>
    );
}
