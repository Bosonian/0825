//
//  Date+Extensions.swift
//  iGFAP Stroke Triage Assistant
//
//  Date utility extensions
//

import Foundation

extension Date {
    // MARK: - Formatting

    /// Format date as short date string (e.g., "Jan 1, 2025")
    var asShortDateString: String {
        formatted(date: .abbreviated, time: .omitted)
    }

    /// Format date as short time string (e.g., "3:45 PM")
    var asShortTimeString: String {
        formatted(date: .omitted, time: .shortened)
    }

    /// Format as date and time (e.g., "Jan 1, 2025 at 3:45 PM")
    var asDateTimeString: String {
        formatted(date: .abbreviated, time: .shortened)
    }

    /// Format as long date string (e.g., "January 1, 2025")
    var asLongDateString: String {
        formatted(date: .long, time: .omitted)
    }

    /// Format as ISO 8601 string
    var asISO8601String: String {
        ISO8601DateFormatter().string(from: self)
    }

    /// Format for medical records (e.g., "2025-01-01 15:45")
    var asMedicalRecordString: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm"
        return formatter.string(from: self)
    }

    /// Relative time string (e.g., "5 minutes ago", "2 hours ago")
    var asRelativeString: String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .full
        return formatter.localizedString(for: self, relativeTo: Date())
    }

    // MARK: - Date Components

    /// Get year component
    var year: Int {
        Calendar.current.component(.year, from: self)
    }

    /// Get month component
    var month: Int {
        Calendar.current.component(.month, from: self)
    }

    /// Get day component
    var day: Int {
        Calendar.current.component(.day, from: self)
    }

    /// Get hour component
    var hour: Int {
        Calendar.current.component(.hour, from: self)
    }

    /// Get minute component
    var minute: Int {
        Calendar.current.component(.minute, from: self)
    }

    /// Start of day
    var startOfDay: Date {
        Calendar.current.startOfDay(for: self)
    }

    /// End of day
    var endOfDay: Date {
        Calendar.current.date(bySettingHour: 23, minute: 59, second: 59, of: self) ?? self
    }

    // MARK: - Date Arithmetic

    /// Add days
    func adding(days: Int) -> Date {
        Calendar.current.date(byAdding: .day, value: days, to: self) ?? self
    }

    /// Add hours
    func adding(hours: Int) -> Date {
        Calendar.current.date(byAdding: .hour, value: hours, to: self) ?? self
    }

    /// Add minutes
    func adding(minutes: Int) -> Date {
        Calendar.current.date(byAdding: .minute, value: minutes, to: self) ?? self
    }

    /// Subtract days
    func subtracting(days: Int) -> Date {
        adding(days: -days)
    }

    // MARK: - Comparisons

    /// Check if date is today
    var isToday: Bool {
        Calendar.current.isDateInToday(self)
    }

    /// Check if date is yesterday
    var isYesterday: Bool {
        Calendar.current.isDateInYesterday(self)
    }

    /// Check if date is tomorrow
    var isTomorrow: Bool {
        Calendar.current.isDateInTomorrow(self)
    }

    /// Check if date is in the past
    var isPast: Bool {
        self < Date()
    }

    /// Check if date is in the future
    var isFuture: Bool {
        self > Date()
    }

    /// Check if date is within last n days
    func isWithinLast(days: Int) -> Bool {
        let startDate = Date().subtracting(days: days)
        return self >= startDate && self <= Date()
    }

    // MARK: - Time Intervals

    /// Time interval since now (negative if in past)
    var timeIntervalSinceNow: TimeInterval {
        timeIntervalSince(Date())
    }

    /// Time interval until now (negative if in future)
    var timeIntervalUntilNow: TimeInterval {
        Date().timeIntervalSince(self)
    }

    /// Minutes since date
    func minutesSince(_ date: Date) -> Int {
        Int(timeIntervalSince(date) / 60)
    }

    /// Hours since date
    func hoursSince(_ date: Date) -> Int {
        Int(timeIntervalSince(date) / 3600)
    }

    /// Days since date
    func daysSince(_ date: Date) -> Int {
        Calendar.current.dateComponents([.day], from: date, to: self).day ?? 0
    }

    // MARK: - Medical Use Cases

    /// Check if session is expired (based on timestamp)
    func isSessionExpired(duration: TimeInterval = TimeInterval(AppConstants.sessionDurationMinutes * 60)) -> Bool {
        Date().timeIntervalSince(self) > duration
    }

    /// Format as timestamp for assessment
    var asAssessmentTimestamp: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        formatter.timeZone = TimeZone(identifier: "UTC")
        return formatter.string(from: self)
    }
}

// MARK: - Date Range

extension Date {
    /// Create range from date to another date
    func range(to endDate: Date) -> ClosedRange<Date> {
        self...endDate
    }

    /// Check if date is in range
    func isInRange(_ range: ClosedRange<Date>) -> Bool {
        range.contains(self)
    }
}

// MARK: - Date Creation

extension Date {
    /// Create date from components
    static func from(year: Int, month: Int, day: Int, hour: Int = 0, minute: Int = 0) -> Date? {
        var components = DateComponents()
        components.year = year
        components.month = month
        components.day = day
        components.hour = hour
        components.minute = minute
        return Calendar.current.date(from: components)
    }

    /// Parse ISO 8601 string
    static func fromISO8601(_ string: String) -> Date? {
        ISO8601DateFormatter().date(from: string)
    }
}
