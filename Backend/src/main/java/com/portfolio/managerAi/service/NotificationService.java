package com.portfolio.managerAi.service;

import com.portfolio.managerAi.dto.ExpenseDTO;
import com.portfolio.managerAi.entity.ProfileEntity;
import com.portfolio.managerAi.repository.ExpenseRepository;
import com.portfolio.managerAi.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.manager.frontend.url}")
    private String frontendUrl;

    @Scheduled(cron = "0 0 22 * * *", zone = "IST") //for everyday at 10pm
    //@Scheduled(cron = "0 * * * * *",zone = "IST") //for checking every minute
    public void sendDailyIncomeExpenseReminder(){
        log.info("Job started: sendDailyIncomeReminder()");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for (ProfileEntity profile : profiles) {
            String body = "Hi " + profile.getFullName() + ",<br><br>"
                    + "This is a friendly reminder to add your income and expenses for today.<br><br>"
                    + "<a href='" + frontendUrl + "' "
                    + "style='display:inline-block; padding:12px 20px; font-size:16px; font-weight:bold; "
                    + "color:#ffffff; background-color:#4CAF50; text-decoration:none; border-radius:6px; "
                    + "box-shadow:0 2px 5px rgba(0,0,0,0.2); transition:background-color 0.3s;'>"
                    + "Add Income & Expenses"
                    + "</a>"
                    + "<br><br>Best regards,<br>Money Manager Team";
            emailService.sendEmail(profile.getEmail(), "Daily reminder: Add your income and expenses",body);
        }
        log.info("Job completed: sendDailyIncomeReminder");
    }

    @Scheduled(cron = "0 0 23 * * *", zone = "IST")
    public void sendDailyExpenseSummary(){
        log.info("Job started: sendDailyExpensesSummary");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for (ProfileEntity profile : profiles){
           List<ExpenseDTO> todayExpense =  expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now(ZoneId.of("Asia/Kolkata")));
           if(!todayExpense.isEmpty()){
               StringBuilder table = new StringBuilder();
               table.append("<table style='border-collapse:collapse;width:100%;'>'");
               table.append("<tr style='background-color:#f2f2f2;''><th style='border:1px solid #ddd;pa (add further styling)");

               int i = 1;
               for (ExpenseDTO expense : todayExpense){
                   table.append("add table styles").append(i++).append("</td>");
                   table.append("add table styles").append(expense.getName()).append("</td>");
                   table.append("add table styles").append(expense.getAmount()).append("</td>");
                   table.append("add table styles").append(expense.getCategoryId()!=null ? expense.getCategoryName() : "N/A").append("</td>");
                   table.append("</tr>");
               }
               table.append("</table>");
               String body = "Hi "+profile.getFullName()+"here is summary add styling here"+table+"more styling to have proper table";
               emailService.sendEmail(profile.getEmail(),"Your daily expense summary", body);
           }
        }
    }
}
