import { AllExceptionFilter } from '@infra/common/filter/exception.filter';
import { LoggingInterceptor } from '@infra/common/interceptors/logging.interceptor';
import { ResponseFormat, ResponseInterceptor } from '@infra/common/interceptors/response.interceptor';
import { LoggerServiceImpl } from '@infra/logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const env = process.env.NODE_ENV;

    //Filters
    app.useGlobalFilters(new AllExceptionFilter(new LoggerServiceImpl()));

    //Interceptors
    app.useGlobalInterceptors(new LoggingInterceptor(new LoggerServiceImpl()));
    app.useGlobalInterceptors(new ResponseInterceptor());

    // base routing
    app.setGlobalPrefix('api/v1');
    app.enableCors();

    // swagger config
    if (env !== 'production') {
        
        const config = new DocumentBuilder()
            .addOAuth2({
                type: 'oauth2',
                flows: {
                    password: {
                        tokenUrl: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
                        authorizationUrl: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/auth`,
                        scopes: {}
                    }
                }
            })
            .setTitle('Official Stamps API').setVersion('1.0').build();
        
        const document = SwaggerModule.createDocument(app, config, {
            extraModels: [ResponseFormat],
            deepScanRoutes: true,
        });
        
        SwaggerModule.setup('api', app, document, {
            swaggerOptions: {
                initOAuth: {
                    clientId: process.env.KEYCLOAK_CLIENT_ID,
                    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET
                }
            }
        });
    }

    await app.listen(3000, '0.0.0.0');
}
bootstrap();
