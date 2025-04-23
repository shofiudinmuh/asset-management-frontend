import { Helmet, HelmetProvider } from 'react-helmet-async';

// component for managing page metadata (title and description)
const PageMeta = ({ title, description }) => {
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
    </Helmet>;
};

export const AppWrapper = ({ children }) => <HelmetProvider>{children}</HelmetProvider>;

export default PageMeta;
