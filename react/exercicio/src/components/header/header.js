import { PageHeader, Button, Descriptions } from 'antd';

const TopoPagina = () => (
  <div className="App">
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="FLASH"
        subTitle="Exercico Flash"
        extra={[
          <Button href="/funcionarios" type="default">Funcionários</Button>,
          <Button href="/empresas" type="default">Empresas</Button>,
          <Button href="/relatorio" type="default">Relatório</Button>,
        ]}
      ></PageHeader>
    </div>
  </div>
);

export default TopoPagina;