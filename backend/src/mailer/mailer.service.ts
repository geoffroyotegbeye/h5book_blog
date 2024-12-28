import { Resend } from 'resend';

const resend = new Resend('re_123456789');

export class MailerService {
    private readonly mailer: Resend;
    constructor() {
        this.mailer = new Resend(process.env.RESEND_API_KEY);
    }

    async sendCreatedAccountEmail({ recipient, firstname }: { recipient: string, firstname: string }) {
        try {
            const { data, error } = await this.mailer.emails.send({
                from: 'onboarding@resend.dev',
                to: ['warrisagbannonde@outlook.com'],
                // to: [recipient],
                subject: '🎉 Bienvenue sur H5Book Blog ! 🎉',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h1 style="color: #4CAF50; text-align: center;">Bienvenue sur H5Book Blog !</h1>
                        <p>Bonjour, ${firstname}</p>
                        <p>Nous sommes ravis de vous accueillir dans notre communauté de passionnés de livres ! <strong>H5Book Blog</strong> est l'endroit idéal pour connecter lecteurs et auteurs, partager des avis éclairés et célébrer l'amour des livres.</p>
                        <p>Voici ce que vous pouvez faire sur notre plateforme :</p>
                        <ul>
                            <li>📚 Découvrir et donner votre avis sur des livres exceptionnels.</li>
                            <li>✍️ Partager vos pensées et échanger avec d'autres lecteurs.</li>
                            <li>🌟 Suivre vos auteurs préférés et rester informé des nouveautés.</li>
                        </ul>
                        <p>Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter à <a href="mailto:h5bookblog@gmail.com" style="color: #4CAF50;">h5bookblog@gmail.com</a>.</p>
                        <p>Bonne lecture !</p>
                        <p style="font-weight: bold;">- L'équipe H5Book Blog</p>
                        <hr style="border: none; border-top: 1px solid #ddd;" />
                        <footer style="text-align: center; font-size: 0.9em; color: #888;">
                            <p>Vous recevez cet email car vous vous êtes inscrit(e) sur H5Book Blog.</p>
                            <p>Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.</p>
                        </footer>
                    </div>
                `,
            });

            if (error) {
                return {
                    error: true,
                    message: error.message,
                };
            }

            console.log({ data });
        } catch (error) {
            return {
                error: true,
                message: error.message,
            };
        }
    }

    async sendActivationCodeEmail({
                                      recipient,
                                      firstname,
                                      activationCode,
                                  }: {
        recipient: string;
        firstname: string;
        activationCode: string;
    }) {
        try {
            const { data, error } = await this.mailer.emails.send({
                from: 'onboarding@resend.dev',
                // to: [recipient],
                to: ['warrisagbannonde@outlook.com'],
                subject: '🔑 Votre code d’activation - H5Book Blog',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h1 style="color: #4CAF50; text-align: center;">Votre code d'activation</h1>
                        <p>Bonjour ${firstname},</p>
                        <p>Merci de rejoindre <strong>H5Book Blog</strong> !</p>
                        <p>Voici votre code d’activation pour finaliser la création de votre compte :</p>
                        <h2 style="color: #4CAF50; text-align: center;">${activationCode}</h2>
                        <p>Veuillez entrer ce code sur notre site pour activer votre compte.</p>
                        <p>Si vous avez des questions ou besoin d’assistance, n’hésitez pas à nous contacter à <a href="mailto:h5bookblog@gmail.com" style="color: #4CAF50;">h5bookblog@gmail.com</a>.</p>
                        <p style="font-weight: bold;">- L'équipe H5Book Blog</p>
                        <hr style="border: none; border-top: 1px solid #ddd;" />
                        <footer style="text-align: center; font-size: 0.9em; color: #888;">
                            <p>Vous recevez cet email car vous avez créé un compte sur H5Book Blog.</p>
                            <p>Si vous n'êtes pas à l'origine de cette inscription, veuillez ignorer cet email.</p>
                        </footer>
                    </div>
                `,
            });

            if (error) {
                return {
                    error: true,
                    message: error.message,
                };
            }

            console.log({ data });
        } catch (error) {
            return {
                error: true,
                message: error.message,
            };
        }
    }
}
